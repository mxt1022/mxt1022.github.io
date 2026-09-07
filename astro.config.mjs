import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  site: process.env.SITE_URL || 'https://mxt1022.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !['/404', '/404.html', '/rss.xml', '/search-index.json']
        .some((suffix) => new URL(page).pathname.endsWith(suffix)),
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-dark-high-contrast',
      wrap: true,
    },
  },
});
