import { withBase } from './site';
import imageManifest from '../data/image-manifest.json';

export function imageUrl(source: string) {
  const asset = (imageManifest.assets as Record<string, { key: string }>)[source];
  const base = (import.meta.env.PUBLIC_IMAGE_BASE_URL || imageManifest.publicBaseUrl).replace(/\/+$/, '');
  if (asset && base) {
    return `${base}/${asset.key.split('/').map(encodeURIComponent).join('/')}`;
  }
  return /^https?:\/\//.test(source) ? source : withBase(source);
}

const siteImage = (filename: string) => imageUrl(`/assets/images/${filename}`);

const responsiveSet = (prefix: string, widths: number[]) => widths
  .map((width) => `${siteImage(`${prefix}-${width}.webp`)} ${width}w`)
  .join(', ');

export const siteImages = {
  logo: {
    favicon: siteImage('logo-64.png'),
    nav: siteImage('logo-96.webp'),
    about: siteImage('logo-420.webp'),
    aboutSrcSet: responsiveSet('logo', [140, 280, 420]),
  },
  avatar: {
    profile: siteImage('avatar-540.webp'),
    profileSrcSet: responsiveSet('avatar', [240, 360, 540]),
  },
  og: siteImage('og.jpg'),
} as const;
