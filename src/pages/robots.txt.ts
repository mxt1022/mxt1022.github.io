import type { APIRoute } from 'astro';
import { withBase } from '../utils/site';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://mxt1022.github.io/');
  const siteRoot = withBase('/');
  const sitemap = new URL(withBase('/sitemap-index.xml'), origin);

  return new Response(`User-agent: *\nAllow: ${siteRoot}\n\nSitemap: ${sitemap.href}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
