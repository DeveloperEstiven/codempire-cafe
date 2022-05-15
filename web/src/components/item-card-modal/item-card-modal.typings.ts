import { IMenu, IProduct } from 'typings/api';

export interface IItemCardModalProps {
  item: IMenu | IProduct;
  isOpen: boolean;
  close: () => void;
}
