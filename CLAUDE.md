# CLAUDE.md: Tanya Mirza Portfolio

Personal portfolio for Tanya Mirza (Product Designer, HCI master's @ University of Michigan).
Rebuilt from Framer as a static Astro site deployed on Vercel. The owner is a designer, not an
engineer: explain any command you ask her to run in one plain-English sentence, and build in
small, previewable steps.

## Stack

- **Astro 7** (static output, zero client JS by default) + **MDX** + **@astrojs/sitemap**
- **Tailwind CSS v4** via `@tailwindcss/vite`. There is no `tailwind.config.js`; tokens live in
  `src/styles/global.css` under `@theme`.
- Fonts self-hosted with `@fontsource` (Latin subset): Poppins 500/600/700, Lato 400/400i/700.
  No monospace font (the owner disliked it); don't reintroduce one.
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
  components/case-study/ # case-study building blocks (see "Creating a case study")
  components/            # PascalCase .astro components
  components/mdx/        # components usable inside case-study MDX
  content/projects/      # one .md/.mdx file per project (kebab-case slug = URL)
  content.config.ts      # Zod schema for projects
  lib/projects.ts        # getProjects() (sorted by `order`) and projectUrl()
  lib/remark-case-study.mjs  # numbers case-study sections + builds the TOC from `##` headings
  lib/mdx-components.ts  # components available in MDX without imports
  assets/                # images processed by astro:assets: illustrations/, projects/<slug>/ (card
                         # covers), case-studies/<slug>/ (case-study images), logos/
  pages/                 # routes: index, about, work/[slug], 404
public/                  # files served as-is (favicon, og image, robots.txt, cursors/*.svg)
```

## Content rules

- **Projects live in `src/content/projects/` only.** Never hard-code project data in pages or
  components; the home grid and case-study routes read the collection.
- File name = slug = URL (`dpss-intranet.mdx` → `/work/dpss-intranet`). Use kebab-case.
- `status: coming-soon` shows a non-linked card and generates no page; `status: published`
  generates `/work/<slug>`.
- Card order on the home page comes from `order` (ascending), newest project first: DPSS Intranet (1),
  MHNSC (2), DPSS Microsite (3), Cardamom (4). "Next project" follows the same order and skips
  coming-soon projects.
- **Privacy / NDA:** never name real people (clients, teammates, participants) or use their pronouns;
  say "the client team", "a participant". Blur names, emails and faces of real people in screenshots.
  MHNSC work is under an NDA: keep the "All rights reserved to MHNSC" callout at the top and the
  rights note at the end of that case study, and never imply the team owns the work.
- Case-study body order: Problem → My Role → Process → Research Insights → Design Decisions →
  Outcome.
- Site-wide text and links go in `src/data/site.ts`, not inline in components.

## Creating a case study

Every case study uses the same template (`src/pages/work/[slug].astro` →
`src/layouts/CaseStudyLayout.astro`). Never build a one-off page layout.

**Page order (automatic):** ← Back to work · eyebrow · title · subtitle · hero · meta grid (Role,
Timeline, Team, Tools/Methods) · TL;DR · stat row · numbered body sections · Next project · footer.
Desktop has a sticky TOC on the left (200px); below `lg` it becomes a sticky "On this page" bar
with a dropdown. Reading-progress line and scroll-spy are in the layout's script.

### 1. Files

- `src/content/projects/<slug>.mdx`: the case study. Slug = URL `/work/<slug>`, kebab-case.
- `src/assets/projects/<slug>/thumbnail.png`: card cover (device-mockup style, 1920×1200).
- `src/assets/case-studies/<slug>/`: all case-study images. Name them descriptively,
  `<short-project>-<what>-<variant>.png`, e.g. `microsite-job-listings-desktop.png`. Never put
  case-study images in `public/` (they wouldn't be optimized).

### 2. Front-matter

```yaml
title: …
description: One line for the card + meta description
tags: [UX Research, …]           # card pills
thumbnail: ../../assets/projects/<slug>/thumbnail.png
thumbnailAlt: …                  # required
status: published                # or coming-soon (card only, no page)
order: 3                         # home-page position; also drives "Next project"
eyebrow: UX Research Case Study · 2026
subtitle: One sentence under the title           # required when published
hero: ../../assets/case-studies/<slug>/<slug>-hero.png   # optional, falls back to thumbnail
heroAlt: …                       # required if hero is set
heroCaption: …                   # optional
tldr: 2–3 sentences, what I did + outcome        # required when published
stats:                           # optional; 4, 5 or 6 items lay out evenly
  - { value: '553', label: 'Active users' }
role: … ; timeline: … ; team: …  # role + timeline required when published
tools: [Figma] ; methods: [Interviews]           # either or both
```

### 3. Sections and the TOC (never maintained by hand)

Each `##` starts a numbered section. Add a 1–2 word TOC label as an MDX comment:

```mdx
## Why did a tool used by 553 people stop working? {/* toc: Challenge */}
```

`src/lib/remark-case-study.mjs` wraps it in `<section id="challenge">`, adds the "01 ✦ CHALLENGE"
eyebrow and the ✦ ★ ✦ divider, and feeds the TOC. Without a label the heading text is used. Use
`###` (and `####`) for sub-sections (they don't appear in the TOC). "Overview" is added by the layout. Content
before the first `##` (e.g. a confidentiality `<Callout>`) sits under Overview.

### 4. Components (no imports needed)

| Component                                                                                          | Use                                                                |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `<StatRow stats={[{value, label}]} label="…" />`                                                   | headline numbers                                                   |
| `<PullQuote by="Who">quote</PullQuote>`                                                            | user/stakeholder quote                                             |
| `<Callout variant="note\|problem\|hmw" label?>…</Callout>`                                         | problem statement, "How might we…", notes                          |
| `<Figure src={img} alt="…" caption?="…" framed? />`                                                | one image (import it at the top of the MDX)                        |
| `<Figure … narrow />` / `<Figure pair={[…]} columns={2} />`                                        | square/tall charts at a readable size / grids (e.g. persona cards) |
| `<Figure pair={[{src, alt, label:'Desktop'}, {src, alt, label:'Mobile'}]} caption="…" />`          | side-by-side, equal heights                                        |
| `<NumberedList>` + markdown `1. **Title** text` + `</NumberedList>`                                | findings, recommendations, decisions                               |
| `<TagList tags={[…]} label="…" />`                                                                 | pills matching the home cards                                      |
| `<ProcessSteps steps={[{title, text, emphasis?}]} loop? />`                                        | phases / loops (emphasis = "Break point")                          |
| `<TwoColumn leftTitle leftIcon rightTitle rightIcon>` + `<div slot="left">` / `<div slot="right">` | "Worked well / Would change"                                       |
| `<Finding n="F1" kicker="Finding ONE" title="…">…</Finding>`                                       | research findings                                                  |
| `<StatusList items={[{label, status}]} />`                                                         | "Search — Broken" style status rows                                |
| `<LinkButton href="…" label="View prototype" />`                                                   | clear CTA (external → new tab)                                     |

**Interactive blocks (use to cut text, not to hide the story):**

| Component                                                                                                  | Use                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Cards cols={2\|3\|4} numbered? items={[{title, text, tags?}]} />`                                        | turn "Label: explanation" lists into scannable cards                                                                                                                                                     |
| `<Expandable title="…">markdown</Expandable>` (owner disliked these on the Microsite; avoid)               | secondary detail ("read more"); native `<details>`                                                                                                                                                       |
| `<Personas personas={[{name, archetype, photo, age, occupation, context, goals, needs, frustrations}]} />` | persona tabs (Lauren Beck–style; one persona = no tabs); photos are square crops `…-photo.png/jpg` with the **head centered** (check every one); optional `details`, `columns`, `profile` (1–5), `quote` |
| `<Compare id beforeLabel afterLabel>` + `<div slot="before">` / `<div slot="after">`                       | before/after toggle                                                                                                                                                                                      |
| `<CardSort id sorts={[{label, groups:[{title, cards, highlight?}]}]} confusing={[…]} />`                   | card-sort results in portfolio style, toggle per participant (never paste Miro screenshots)                                                                                                              |
| `<Figure … arrow />`                                                                                       | arrow between two images (flow A → B)                                                                                                                                                                    |

Every `<Figure>` image gets a ⤢ magnifier that opens `Lightbox.astro` (fit / actual size).
Stat numbers count up on scroll; cards stagger in. All of it degrades to plain visible content
without JS and respects reduced motion. Tabs logic: `src/lib/tabs.ts`.
Owner's direction (Oct 2026): fewer words per screen, bold key phrases, visuals over paragraphs;
references (Manya Singh, Sugandha, Lauren Beck) are in `/reference` (gitignored).

`<TwoColumn>` icons: `alert`/`target` (problem vs goal), `sparkle`/`lightbulb` (highlights vs
lessons), `check`/`refresh` (worked well vs would change); bullets get matching markers.
Box-shaped blocks (TL;DR, stat rows, cards, callouts, status lists) span the full article column so
their edges line up; only running text uses `max-w-text`.

MDX gotchas: put markdown inside components on its own lines with blank lines around it, and keep
closing tags like `</div>` unindented after a list. Give `<LinkButton>` its text via `label`.

### 5. Checklist before publishing

- Every image has real alt text (decorative → `alt=""`); captions say what to notice.
- TL;DR answers "what did she do and what changed" in ≤3 sentences.
- Keep the owner's wording; **flag** inconsistencies (numbers, team size, dates) instead of
  silently fixing them, and show copy edits as before/after for approval.
- `npm run check && npm run format:check && npm run build`, then screenshot at 1440px and 390px.

### 6. Figma workflow

Case studies can be pulled straight from Tanya's Figma files with the Figma connector
(`get_metadata` for structure, `get_design_context` for verbatim text, `download_assets` for the
original images; `www.figma.com` must be in the environment's allowed domains). Rebuild the
content in this template rather than copying the Figma layout, keep her wording, and leave out
old footers/credits (the 2025 files say "Tanya Haque"; her name is now **Tanya Mirza**). Very large
photos (e.g. 4032px sketch scans) are saved as ~2400px JPGs; screenshots stay PNG.

## About page

`src/pages/about.astro`: scrapbook polaroid portrait (`tanya-portrait-flowers.jpg`, shown
uncropped and unedited at its own 2:3 ratio, per the owner; washi tape, twinkling star doodles,
straightens on hover), photo and text columns vertically centred so they balance, a bio
(mostly the owner's original Framer wording; the photo fills its column on `lg` to balance it) with a hand-drawn squiggle under the key phrase, facts list (no "Let's connect" buttons: the owner removed them as redundant with the footer), then an Experience list from `src/data/experience.ts` (orgs newest first; orgs
with several roles show a ✦ timeline). The Framer "Wonder Who I Am?" cat section was removed on
purpose. Edit roles/dates in the data file, not the page.

## Design tokens (use these names, never raw hex/px in components)

- Colors: `sage` #5C6F55 (brand/buttons/links), `sage-dark` #4B6043 (hover), `sage-50`
  (tag tint), `ink` #1C1B1F (text), `muted` #5F5E66 (secondary text), `surface` #F4F4F4,
  `line` #D9D9D9 (decorative borders only), `bg` #FFFFFF. Palette is the owner's existing Framer
  palette; don't introduce new colors without asking. Light mode only (for now).
- Green is the brand: page headings (`h1`, footer heading) and the "TM ★" logo use `sage-dark`.
  Project-cover backdrops may use per-project tints (they're part of the image, not the UI).
- Type: `font-display` (Poppins: headings, buttons, tags, labels), `font-sans` (Lato, body).
  Sizes: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lg`, `text-base`,
  `text-sm`, `text-xs`. They're fluid via `clamp()`, so you rarely need responsive text classes.
- Utilities: `container-page` (max-w-6xl + gutters), `eyebrow` (small uppercase Poppins label,
  prefixed with a decorative ✦, e.g. "✦ Selected work").
- Radius: `rounded-card` (20px), `rounded-pill`. Shadows: `shadow-card`, `shadow-card-hover`.
- Motion: `ease-out` token; reveals ≈900ms with a 28px rise, case-study cards stagger 150ms
  apart, stat numbers count up over 1.8s, hover lift 4px. The owner wants motion slow enough to
  notice; don't speed it back up. All motion must respect
  `prefers-reduced-motion` (handled globally in `global.css`; don't override it).

## Brand details (from the Framer site — keep them)

- **Star theme**: the logo is "TM ★". `StarCursor.astro` replaces the mouse cursor with a
  small (24px) hand-drawn **doodle star in light sage with a thin sage-dark edge** (no ink/black
  outline; the owner disliked it; the edge keeps it visible on green elements) that leaves a
  **trail of little sparkles** (sage / light sage, a reused pool of 16 nodes). Over clickable
  things it grows, turns pale green (sage-50 fill, sage-dark edge, so it shows on green buttons) and wiggles; a click spins it and bursts a ring of sparkles. It only
  runs for mouse users with motion allowed; everyone else gets the static
  `public/cursors/star.svg` / `star-hover.svg` via CSS. Touch devices are untouched. The logo ★
  spins on hover; ✦ is used as a small decorative accent.
- **Hero**: fills the screen below the nav (`min-h-[calc(100svh-4rem)]`) so projects are only
  seen after scrolling or clicking "Take a Peek". "Hiya, I'm Tanya." in `sage-dark`, letters pop
  in one by one (`.letter`, CSS only, with an `sr-only` copy of the sentence for screen readers).
  Illustration sits in the Framer circle composition (outline ring + three sage circles, 367×493
  ratio, image 192px wide). Letters and circles share one slow timeline in `global.css`
  (both finish ≈2.5s); keep them in sync if you change either. The owner tried doodle
  underlines on the tagline and asked for them removed; don't add them back.
- **Availability badge**: two lines, outlined pill. Line 1 "Available for Full-Time" (priority),
  line 2 "Starting Summer 2027 ✦ Open to Relocate".
- **Project covers**: device mockups (laptop, plus phone when a mobile screen exists) on a soft
  backdrop tinted to that project's brand, 1920×1200 (16:10).

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
