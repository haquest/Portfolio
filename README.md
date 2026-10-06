# Tanya Mirza: Portfolio

My personal portfolio, built with [Astro](https://astro.build) and Tailwind CSS and deployed on
Vercel.

## Preview it on your computer

You need [Node.js](https://nodejs.org) (the "LTS" version) installed once.

```bash
npm install     # downloads the project's building blocks (first time, or after pulling changes)
npm run dev     # starts a live preview at http://localhost:4321; it refreshes when you save
```

Press `Ctrl + C` in the terminal to stop the preview.

To see exactly what will go live:

```bash
npm run build   # builds the real site into the dist/ folder
npm run preview # serves that build at http://localhost:4321
```

## Edit site-wide text and links

Open `src/data/site.ts` to change your resume link, LinkedIn, email, availability badge, and
the default page title/description used by Google and link previews.

## Add a case study

Every project is one file in `src/content/projects/`. The file name becomes the web address:
`cardamom.md` → `/work/cardamom`.

1. Put the cover image in `src/assets/projects/<project-name>/thumbnail.png`.
2. Copy an existing project file (e.g. `nail-salon-cooperative.md`), rename it, and edit the
   section between the `---` lines:

   ```yaml
   title: Cardamom – Ann Arbor
   description: One sentence for the card (also shown on Google and link previews).
   tags: [UX Design, Usability Testing]
   thumbnail: ../../assets/projects/cardamom/thumbnail.png
   thumbnailAlt: Describe what the image shows for people using screen readers.
   status: coming-soon # change to "published" when the case study is ready
   order: 4 # position on the home page (1 = first)
   ```

3. Save. The home page updates automatically. If you forget a required field, the preview shows
   an error naming the field that's missing.

Card thumbnails are shown at a 16:10 ratio, so 1600 × 1000 px (or anything wider) works best.

## Deploy

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. Vercel
   detects Astro automatically.
3. From then on, every push publishes the site automatically.
