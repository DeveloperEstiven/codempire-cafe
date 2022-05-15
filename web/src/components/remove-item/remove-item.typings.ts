import { IMenu, IProduct } from 'typings/api';

export interface IRemoveItemProps {
  isOpen: boolean;
  onClose: () => void;
  item: IMenu | IProduct;
}
