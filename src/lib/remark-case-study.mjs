// Turns a case study's `##` headings into numbered sections and a table of contents,
// so nobody has to maintain the TOC by hand.
//
// In MDX, write a heading with an optional short TOC label as an MDX comment:
//
//   ## Why did a tool used by 553 people stop working? {/* toc: Challenge */}
//
// Each `##` and everything after it (until the next `##`) is wrapped in
//   <section id="challenge" class="cs-section" data-reveal aria-labelledby="challenge-title">
// with a small "02 ✦ Challenge" eyebrow above the heading. The list of sections is exposed as
// `remarkPluginFrontmatter.toc` ([{ id, label }]) for the page layout to render.
// Without a label comment, the heading text is used.

const TOC_COMMENT = /^\s*\/\*\s*toc:\s*(.+?)\s*\*\/\s*$/;

function textOf(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function remarkCaseStudy() {
  return (tree, file) => {
    // Only touch case-study content files.
    if (!String(file.path ?? file.history?.[0] ?? '').includes('/content/projects/')) return;

    const toc = [];
    const used = new Set(['overview']);
    const children = [];
    let current = null;

    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        let label = null;
        node.children = node.children.filter((child) => {
          const match = child.type === 'mdxTextExpression' && child.value.match(TOC_COMMENT);
          if (match) label = match[1];
          return !match;
        });
        // Trim the space left behind by the removed comment.
        const last = node.children.at(-1);
        if (last?.type === 'text') last.value = last.value.replace(/\s+$/, '');

        const title = textOf(node).trim();
        label ??= title;
        let id = slugify(label) || `section-${toc.length + 1}`;
        while (used.has(id)) id += '-2';
        used.add(id);
        const number = String(toc.length + 1).padStart(2, '0');
        toc.push({ id, label });

        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: `${id}-title` } };

        const eyebrow = {
          type: 'csEyebrow',
          data: {
            hName: 'p',
            hProperties: { className: ['cs-eyebrow'], 'aria-hidden': 'true' },
          },
          children: [{ type: 'text', value: `${number} ✦ ${label}` }],
        };

        current = {
          type: 'csSection',
          data: {
            hName: 'section',
            hProperties: {
              id,
              className: ['cs-section'],
              'data-reveal': '',
              'aria-labelledby': `${id}-title`,
            },
          },
          children: [eyebrow, node],
        };
        children.push(current);
      } else if (current) {
        current.children.push(node);
      } else {
        children.push(node);
      }
    }

    tree.children = children;
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.toc = toc;
  };
}
