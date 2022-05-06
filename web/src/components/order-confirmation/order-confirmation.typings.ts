import { IAddOrder, IAddress, IMenu, IProduct } from 'typings/api';

export interface IOrderConfirmationProps {
  address: IAddress;
  wantedDeliveryDate: Date;
  comment: string;
  item: IMenu | IProduct | null;
}

export type TAddOrderResult = Omit<IAddOrder, 'productsOrders' | 'menusOrders'>;
