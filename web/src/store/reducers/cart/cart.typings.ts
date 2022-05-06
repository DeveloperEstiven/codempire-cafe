import { IMenu, IProduct } from 'typings/api';

export interface ICartInitialState {
  cart: {
    menus: IOrderedMenu[];
    products: IOrderedProduct[];
  };
  totalItems: number;
  totalPrice: number;
}
export interface IOrderedProduct {
  product: IProduct;
  count: number;
}
export interface IOrderedMenu {
  menu: IMenu;
  count: number;
}
