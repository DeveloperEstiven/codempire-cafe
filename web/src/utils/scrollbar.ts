export const hideScrollBar = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.width = `calc(100% - ${scrollBarWidth}px)`;
};

export const showScrollBar = () => {
  document.body.style.overflow = '';
  document.body.style.width = 'auto';
};

export const hideScrollBarBox = () => {
  document.body.style.overflowY = 'scroll';
};
