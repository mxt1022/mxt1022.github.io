import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
    shikiConfig: {
      theme: 'github-dark-high-contrast',
      wrap: true,
    },
  },
});
