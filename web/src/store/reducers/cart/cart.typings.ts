import { IMenu, IProduct } from 'typings/api';

export interface ICartInitialState {
  cart: IOrderedProduct[];
  totalItems: number;
  totalPrice: number;
}
export interface IOrderedProduct {
  product: IProduct | IMenu;
  count: number;
}
