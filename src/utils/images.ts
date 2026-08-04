import { withBase } from './site';

const localImage = (filename: string) => withBase(`/assets/images/${filename}`);

const responsiveSet = (prefix: string, widths: number[]) => widths
  .map((width) => `${localImage(`${prefix}-${width}.webp`)} ${width}w`)
  .join(', ');

export const siteImages = {
  logo: {
    favicon: localImage('logo-64.png'),
    nav: localImage('logo-96.webp'),
    about: localImage('logo-420.webp'),
    aboutSrcSet: responsiveSet('logo', [140, 280, 420]),
  },
  avatar: {
    profile: localImage('avatar-540.webp'),
    profileSrcSet: responsiveSet('avatar', [240, 360, 540]),
  },
  og: localImage('og.jpg'),
} as const;
