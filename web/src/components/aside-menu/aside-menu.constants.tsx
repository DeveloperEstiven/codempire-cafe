import { Icon, TIcon } from '@components/icon';
import { TPage, TTool } from './aside-menu.typings';

export const pageNames = ['main', 'profile', 'orders'] as const;
export const toolNames = ['notification', 'cart', 'search'] as const;

export const pages = pageNames.map((el) => ({
  name: `${el}-page` as TPage,
  element: <Icon type={el as TIcon} />,
}));

export const tools = toolNames.map((el) => ({ name: `${el}` as TTool, element: <Icon type={el as TIcon} /> }));
