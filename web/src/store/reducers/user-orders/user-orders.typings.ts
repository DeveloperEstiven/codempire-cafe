import { TSelectedType } from '@screens/orders-page/orders-page.typings';
import { ISort, IUserOrderResponse } from 'typings/api';

export interface IUserOrdersInitialState {
  isWaitingOrders: boolean;
  selectedTab: TSelectedType;
  sort: ISort;
  managerOrders: IUserOrderResponse[];
}
