import { IMenu, IProduct } from 'typings/api';

export interface IRemoveItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: IProduct | IMenu;
  allergenName?: string;
  text: string;
  onDelete: () => void;
  items?: IMenu[] | IProduct[];
  area?: string;
}
