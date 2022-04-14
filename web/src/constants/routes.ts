export const ROUTES = {
  root: '/',
  logIn: '/log-in',
  forgot: '/forgot-password',
  signUp: '/sign-up',
  mainPage: '/main-page',
  ordersPage: '/orders-page',
  ProfilePage: '/profile-page',
  default: '*',
} as const;

export const hideAsideMenuPaths = [ROUTES.root, ROUTES.logIn, ROUTES.signUp];

type Keys = keyof typeof ROUTES;
export type TRoutes = typeof ROUTES[Keys];
