import { IMenu, IProduct } from 'typings/api';

export interface IOrderedItemProps {
  item: IMenu | IProduct;
  count: number;
}
