export const ROUTES = {
  root: '/',
  logIn: '/log-in',
  forgot: '/forgot-password',
  signUp: '/sign-up',
  mainPage: '/main-page',
  ordersPage: '/orders-page',
  profilePage: '/profile-page',
  editProfile: '/edit-profile',
  changePassword: '/change-password',
  privacyPolicy: '/privacy-policy',
  deleteAccount: '/delete-account',
  addAddresses: '/add-addresses',
  cart: '/cart',
  orderPage: '/order-page',
  orderConfirmation: '/order-confirmation',
  default: '*',
} as const;

export const hideAsideMenuPaths = [ROUTES.root, ROUTES.logIn, ROUTES.signUp];

type Keys = keyof typeof ROUTES;
export type TRoutes = typeof ROUTES[Keys];
