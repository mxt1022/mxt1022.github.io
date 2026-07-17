import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const site = new URL(base, context.site);
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const experiences = await getCollection('experiences', ({ data }) => !data.draft);
  const items = [
    ...notes.map((entry) => ({ ...entry.data, link: `/notes/${entry.id}/` })),
    ...experiences.map((entry) => ({ ...entry.data, link: `/contests/${entry.id}/` })),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return rss({
    title: 'mxt.log',
    description: '学习记录、算法竞赛与 AI 竞赛实践笔记。',
    site,
    items: items.map((item) => ({
      title: item.title,
      description: item.description,
      pubDate: item.date,
      link: new URL(item.link.replace(/^\//, ''), site).href,
      categories: item.tags,
    })),
  });
}
