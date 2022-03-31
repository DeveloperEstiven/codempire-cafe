const mediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`;

const SIZE = {
  xsMobile: 320,
  sMobile: 480,
  mobile: 600,
  tablet: 767,
  laptop: 991,
  desktop: 1191,
  largeDesktop: 1400,
};

export const media = {
  media: mediaQuery,
  xsMobile: mediaQuery(SIZE.xsMobile),
  sMobile: mediaQuery(SIZE.sMobile),
  mobile: mediaQuery(SIZE.mobile),
  tablet: mediaQuery(SIZE.tablet),
  laptop: mediaQuery(SIZE.laptop),
  desktop: mediaQuery(SIZE.desktop),
  largeDesktop: mediaQuery(SIZE.largeDesktop),
};
