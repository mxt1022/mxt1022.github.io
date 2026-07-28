const logoSource = 'https://mxtimg.oss-cn-beijing.aliyuncs.com/img/202607281132750.png';
const avatarSource = 'https://mxtimg.oss-cn-beijing.aliyuncs.com/img/202607281131214.png';
const ogSource = 'https://mxtimg.oss-cn-beijing.aliyuncs.com/img/202607281137551.png';

const processImage = (source: string, operations: string) =>
  `${source}?x-oss-process=image/${operations}`;

const responsiveSet = (source: string, widths: number[], quality = 82) =>
  widths
    .map((width) => `${processImage(source, `resize,w_${width}/format,webp/quality,Q_${quality}`)} ${width}w`)
    .join(', ');

export const siteImages = {
  logo: {
    favicon: processImage(logoSource, 'resize,w_64/format,png'),
    nav: processImage(logoSource, 'resize,w_96/format,webp/quality,Q_82'),
    about: processImage(logoSource, 'resize,w_420/format,webp/quality,Q_82'),
    aboutSrcSet: responsiveSet(logoSource, [140, 280, 420]),
  },
  avatar: {
    profile: processImage(avatarSource, 'resize,w_540/format,webp/quality,Q_82'),
    profileSrcSet: responsiveSet(avatarSource, [240, 360, 540]),
  },
  og: processImage(ogSource, 'resize,m_fill,w_1200,h_630/format,jpg/quality,Q_85'),
} as const;
