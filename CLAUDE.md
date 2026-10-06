# CLAUDE.md: Tanya Mirza Portfolio

Personal portfolio for Tanya Mirza (Product Designer, HCI master's @ University of Michigan).
Rebuilt from Framer as a static Astro site deployed on Vercel. The owner is a designer, not an
engineer: explain any command you ask her to run in one plain-English sentence, and build in
small, previewable steps.

## Stack

- **Astro 7** (static output, zero client JS by default) + **MDX** + **@astrojs/sitemap**
- **Tailwind CSS v4** via `@tailwindcss/vite`. There is no `tailwind.config.js`; tokens live in
  `src/styles/global.css` under `@theme`.
- Fonts self-hosted with `@fontsource` (Latin subset): Poppins 500/600, Lato 400/400i/700,
  JetBrains Mono 500.
- Prettier + `prettier-plugin-astro`. TypeScript strict (`astro check`).
- No backend, no UI framework (no React/Vue). Don't add one without asking.

## Commands

| Command           | What it does                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `npm install`     | Install dependencies                                              |
| `npm run dev`     | Live preview at http://localhost:4321                             |
| `npm run build`   | Production build to `dist/` (also validates content front-matter) |
| `npm run preview` | Serve the built `dist/` locally                                   |
| `npm run check`   | Type-check `.astro`/`.ts` files                                   |
| `npm run format`  | Format everything with Prettier                                   |

Before committing: `npm run check && npm run format:check && npm run build` must all pass.

## Folder map

```
src/
  data/site.ts           # name, SEO defaults, resume/LinkedIn/email links, availability, nav
  styles/global.css      # design tokens (@theme), base styles, focus ring, reduced motion
  layouts/               # BaseLayout (html shell + SEO + nav + footer), CaseStudyLayout
  components/            # PascalCase .astro components
  components/mdx/        # components usable inside case-study MDX
  content/projects/      # one .md/.mdx file per project (kebab-case slug = URL)
  content.config.ts      # Zod schema for projects
  assets/                # images processed by astro:assets (illustrations/, projects/<slug>/, logos/)
  pages/                 # routes: index, about, work/[slug], 404
public/                  # files served as-is (favicon, og image, robots.txt)
```

## Content rules

- **Projects live in `src/content/projects/` only.** Never hard-code project data in pages or
  components; the home grid and case-study routes read the collection.
- File name = slug = URL (`dpss-intranet.mdx` → `/work/dpss-intranet`). Use kebab-case.
- `status: coming-soon` shows a non-linked card and generates no page; `status: published`
  generates `/work/<slug>`.
- Card order on the home page comes from `order` (ascending). "Next project" follows the same
  order and skips coming-soon projects.
- Case-study body order: Problem → My Role → Process → Research Insights → Design Decisions →
  Outcome.
- Site-wide text and links go in `src/data/site.ts`, not inline in components.

## Design tokens (use these names, never raw hex/px in components)

- Colors: `sage` #5C6F55 (brand/buttons/links), `sage-dark` #4B6043 (hover), `sage-50`
  (tag tint), `ink` #1C1B1F (text), `muted` #5F5E66 (secondary text), `surface` #F4F4F4,
  `line` #D9D9D9 (decorative borders only), `bg` #FFFFFF. Palette is the owner's existing Framer
  palette; don't introduce new colors without asking. Light mode only (for now).
- Type: `font-display` (Poppins, headings), `font-sans` (Lato, body), `font-mono` (JetBrains
  Mono, labels). Sizes: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lg`, `text-base`,
  `text-sm`, `text-xs`. They're fluid via `clamp()`, so you rarely need responsive text classes.
- Utilities: `container-page` (max-w-6xl + gutters), `label-mono` (uppercase mono label).
- Radius: `rounded-card` (20px), `rounded-pill`. Shadows: `shadow-card`, `shadow-card-hover`.
- Motion: `ease-out` token; fade-up ≈500ms, hover lift 4px. All motion must respect
  `prefers-reduced-motion` (handled globally in `global.css`; don't override it).

## Accessibility (WCAG AA, non-negotiable)

- Every image needs meaningful `alt` (decorative → `alt=""`). Project schema requires
  `thumbnailAlt`.
- One `<h1>` per page; don't skip heading levels.
- Keep the skip link, landmarks (`header`/`nav`/`main`/`footer`) and the global `:focus-visible`
  ring. Never `outline: none` without a visible replacement.
- External links opening a new tab include `<span class="sr-only">(opens in new tab)</span>`.
- Tap targets ≥ 44px (`min-h-11`). Text contrast ≥ 4.5:1 (`line` is not for text).
- Emoji in copy: `<span role="img" aria-label="…">`. Decorative glyphs (★ ✦ ↗): `aria-hidden`.
- No horizontal scrolling at 320px+ width; design mobile-first, then add `md:`/`lg:` styles.

## Performance

- Images always go through `astro:assets` (`<Image>`/`<Picture>`) from `src/assets/`, never
  `public/`, so they get resized, converted to modern formats, and sized to avoid layout shift.
- No client-side JS unless needed; keep any script tiny and inline in the component.
- Target Lighthouse ≥ 90 in all four categories (mobile).

## SEO

- `SEO.astro` (used by `BaseLayout`) renders title, description, canonical, OG, Twitter and
  JSON-LD Person. Pass `title`, `description`, `image`, `imageAlt` props per page.
- Title pattern: `{Page} · Tanya Mirza`; home uses `site.title`.
- `site` in `astro.config.mjs` (and `public/robots.txt`) must match the live domain.

## Conventions

- Components: PascalCase `.astro`, props typed with `interface Props`.
- Tailwind classes in markup. Add a token to `@theme` instead of arbitrary values when a value
  repeats.
- Commits: short imperative subject (e.g. "Add project card component"), body explains why.
- Deploy: Vercel auto-detects Astro; every push to the production branch deploys.
