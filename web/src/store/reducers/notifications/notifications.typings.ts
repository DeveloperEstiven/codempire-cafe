import { IUserOrderResponse } from 'typings/api';

export interface INotificationsInitialState {
  notificationsOrders: IUserOrderResponse[];
  count: number;
}
