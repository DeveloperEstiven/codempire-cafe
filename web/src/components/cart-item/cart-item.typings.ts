import { IMenu, IProduct } from 'typings/api';

export interface ICartItemProps {
  item: IProduct | IMenu;
  count: number;
}
