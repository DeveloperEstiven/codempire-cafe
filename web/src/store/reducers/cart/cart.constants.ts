import { ICartInitialState } from './cart.typings';

export const cartInitialState: ICartInitialState = {
  cart: {
    products: [],
    menus: [],
  },
  totalItems: 0,
  totalPrice: 0,
};
