export const prerender = true;

export function GET({ site }: { site?: URL }) {
  const origin = site ?? new URL('https://mxt1022.github.io');
  const sitemap = new URL('sitemap-index.xml', origin);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
