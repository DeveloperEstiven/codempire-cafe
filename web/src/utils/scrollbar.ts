export const hideScrollBar = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarWidth}px`;
};

export const showScrollBar = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '0';
};

export const hideScrollBarBox = () => {
  document.body.style.overflowY = 'scroll';
};
