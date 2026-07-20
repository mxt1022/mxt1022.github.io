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

const competitionProgressSchema = z.object({
  label: z.string().default('提交时间轴'),
  metric: z.string().default('Score'),
  scoreSuffix: z.string().default(''),
  precision: z.number().int().min(0).max(8).default(4),
  goal: z.enum(['higher', 'lower']).default('higher'),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#c7f36b'),
  demo: z.boolean().default(false),
  submissions: z.array(z.object({
    time: z.coerce.date(),
    title: z.string(),
    strategy: z.string(),
    score: z.number(),
    note: z.string().optional(),
  })).min(1),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: commonSchema.extend({
    category: z.enum(['算法', '人工智能', '计算机基础', '工具与实践', 'Agent']),
  }),
});

const experiences = defineCollection({
  loader: glob({ base: './src/content/experiences', pattern: '**/*.{md,mdx}' }),
  schema: commonSchema.extend({
    type: z.enum(['算法竞赛', 'AI 竞赛']),
    platform: z.string(),
    status: z.string(),
    progress: competitionProgressSchema.optional(),
  }),
});

export const collections = { notes, experiences };
