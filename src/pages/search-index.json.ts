import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const index = notes.map((note) => ({
    id: note.id,
    text: [
      note.data.title,
      note.data.description,
      note.data.category,
      note.data.series,
      note.data.status,
      ...note.data.tags,
      note.body,
    ].join(' ').toLocaleLowerCase('zh-CN'),
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
