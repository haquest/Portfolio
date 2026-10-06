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

_(The project template arrives in build step 2; instructions will be filled in then.)_

## Deploy

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. Vercel
   detects Astro automatically.
3. From then on, every push publishes the site automatically.
