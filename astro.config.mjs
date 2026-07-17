import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://mxt1022.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-high-contrast',
      wrap: true,
    },
  },
});
