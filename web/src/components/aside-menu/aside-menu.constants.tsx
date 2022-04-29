import { TPage, TTool } from './aside-menu.typings';

export const pageNames = ['main', 'profile', 'orders'] as const;
export const toolNames = ['notification', 'cart', 'search'] as const;

export const pages = pageNames.map((el) => ({
  page: `${el}-page` as TPage,
  icon: el,
}));

export const tools = toolNames.map((el) => ({ name: el as TTool, icon: el }));
