import { withBase } from './site';

const fallbackSite = new URL('https://mxt1022.github.io');

export const absoluteSiteUrl = (path: string, site?: URL) =>
  new URL(withBase(path), site ?? fallbackSite).href;

export const createBreadcrumbSchema = (
  items: { name: string; path: string }[],
  site?: URL,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteSiteUrl(item.path, site),
  })),
});
