import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: commonSchema.extend({
    category: z.enum(['算法', '人工智能', '计算机基础', '工具与实践']),
  }),
});

const experiences = defineCollection({
  loader: glob({ base: './src/content/experiences', pattern: '**/*.{md,mdx}' }),
  schema: commonSchema.extend({
    type: z.enum(['算法竞赛', 'AI 竞赛']),
    platform: z.string(),
    status: z.string(),
  }),
});

export const collections = { notes, experiences };
