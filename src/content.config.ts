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

        // Case-study page (needed once the project is published)
        eyebrow: z.string().optional(),
        /** One line under the title on the case-study page. */
        subtitle: z.string().optional(),
        /** Large image at the top of the case study. Falls back to `thumbnail`. */
        hero: image().optional(),
        heroAlt: z.string().optional(),
        heroCaption: z.string().optional(),
        /** 2–3 sentences: what you did and the outcome. Shown near the top. */
        tldr: z.string().optional(),
        /** Optional headline numbers shown under the TL;DR. */
        stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
        role: z.string().optional(),
        timeline: z.string().optional(),
        team: z.string().optional(),
        tools: z.array(z.string()).optional(),
        methods: z.array(z.string()).optional(),
      })
      .superRefine((p, ctx) => {
        if (p.status !== 'published') return;
        for (const field of ['role', 'timeline', 'subtitle', 'tldr'] as const) {
          if (!p[field]) {
            ctx.addIssue({
              code: 'custom',
              path: [field],
              message: `Published case studies need \`${field}\` in their front-matter.`,
            });
          }
        }
        if (p.hero && !p.heroAlt) {
          ctx.addIssue({
            code: 'custom',
            path: ['heroAlt'],
            message: 'Add `heroAlt` describing the hero image for screen-reader users.',
          });
        }
      }),
});

export const collections = { projects };
