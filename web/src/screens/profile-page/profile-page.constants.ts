import { ROUTES } from '@constants/routes';

interface IRoute {
  title: string;
  route: string;
  state?: {
    tab: string;
  };
}

interface IRouteGroup {
  listTitle: string;
  listItems: IRoute[];
}

const commonRoutes: IRoute[] = [
  { title: 'Privacy policy', route: ROUTES.privacyPolicy },
  { title: 'Change password', route: ROUTES.changePassword },
];

export const managerRoutes: IRouteGroup[] = [
  {
    listTitle: 'Actions',
    listItems: [
      { title: 'Orders', route: ROUTES.ordersPage },
      { title: 'Manage products', route: ROUTES.mainPage, state: { tab: 'product' } },
      { title: 'Manage menus', route: ROUTES.mainPage, state: { tab: 'menu' } },
      { title: 'Product compositions', route: ROUTES.productCompositions },
    ],
  },
  {
    listTitle: 'Privacy',
    listItems: [...commonRoutes],
  },
];

export const userRoutes: IRouteGroup[] = [
  {
    listTitle: 'Settings',
    listItems: [
      ...commonRoutes,
      { title: 'Delete account', route: ROUTES.deleteAccount },
      { title: 'Orders', route: ROUTES.ordersPage },
    ],
  },
];

export const settings = [];
