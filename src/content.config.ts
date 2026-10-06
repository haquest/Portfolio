// Schema for case studies in src/content/projects/.
// If a project file is missing a required field, `npm run build` stops and says which one.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        // Card + SEO
        title: z.string(),
        /** One line shown on the card; also used as the page's meta description. */
        description: z.string(),
        tags: z.array(z.string()).min(1),
        thumbnail: image(),
        /** Describe what the image shows, for screen-reader users. Required. */
        thumbnailAlt: z.string().min(1),
        /** `coming-soon` shows a card without a link and creates no page. */
        status: z.enum(['published', 'coming-soon']).default('published'),
        /** Position on the home page (1 = first). */
        order: z.number(),

        // Case-study header (only needed once the project is published)
        eyebrow: z.string().optional(),
        role: z.string().optional(),
        timeline: z.string().optional(),
        team: z.string().optional(),
        tools: z.array(z.string()).optional(),
        methods: z.array(z.string()).optional(),
      })
      .refine((p) => p.status === 'coming-soon' || (p.role && p.timeline), {
        message: 'Published projects need `role` and `timeline` in their front-matter.',
      }),
});

export const collections = { projects };
