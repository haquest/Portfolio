// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkCaseStudy from './src/lib/remark-case-study.mjs';

// Change `site` if you add a custom domain. It's used for canonical URLs,
// Open Graph tags and the sitemap.
export default defineConfig({
  site: 'https://tanyamirza.vercel.app',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Case studies are MDX (which inherits this processor). The plugin numbers their sections
    // and builds the table of contents; see src/lib/remark-case-study.mjs.
    processor: unified({ remarkPlugins: [remarkCaseStudy] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
