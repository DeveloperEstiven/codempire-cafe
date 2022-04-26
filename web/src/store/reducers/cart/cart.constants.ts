import { ICartInitialState } from './cart.typings';

export const cartInitialState: ICartInitialState = JSON.parse(localStorage.getItem('cart') || 'false') || {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};
