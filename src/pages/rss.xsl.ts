import type { APIRoute } from 'astro';
import { withBase } from '../utils/site';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://mxt1022.github.io/');
  const favicon = new URL(withBase('/assets/images/logo-64.png'), origin).href;
  const home = new URL(withBase('/'), origin).href;

  const stylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" doctype-system="about:legacy-compat" />
  <xsl:template match="/rss/channel">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0d0e" />
        <title><xsl:value-of select="title" /> · RSS</title>
        <link rel="icon" type="image/png" sizes="64x64" href="${favicon}" />
        <link rel="shortcut icon" type="image/png" href="${favicon}" />
        <style>
          :root { color-scheme: dark; font-family: system-ui, sans-serif; background: #0b0d0e; color: #f2f4ed; }
          * { box-sizing: border-box; }
          body { width: min(760px, calc(100% - 32px)); margin: 0 auto; padding: 64px 0 96px; line-height: 1.65; }
          header { padding-bottom: 32px; border-bottom: 1px solid #29302e; }
          .brand { color: #c7f36b; font: 600 .75rem ui-monospace, monospace; letter-spacing: .08em; }
          h1 { margin: 10px 0; font-size: clamp(2.4rem, 8vw, 4.6rem); line-height: 1; }
          p { color: #98a09b; }
          a { color: inherit; text-decoration: none; }
          .home { display: inline-block; margin-top: 12px; color: #c7f36b; font-weight: 700; }
          article { padding: 28px 0; border-bottom: 1px solid #29302e; }
          article h2 { margin: 0 0 8px; font-size: 1.2rem; }
          article p { margin: 0; }
          article time { display: block; margin-top: 12px; color: #c7f36b; font: .7rem ui-monospace, monospace; }
        </style>
      </head>
      <body>
        <header>
          <span class="brand">RSS / MXT.LOG</span>
          <h1><xsl:value-of select="title" /></h1>
          <p><xsl:value-of select="description" /></p>
          <a class="home" href="${home}">返回博客 →</a>
        </header>
        <main>
          <xsl:for-each select="item">
            <article>
              <h2><a href="{link}"><xsl:value-of select="title" /></a></h2>
              <p><xsl:value-of select="description" /></p>
              <time><xsl:value-of select="pubDate" /></time>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

  return new Response(stylesheet, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
