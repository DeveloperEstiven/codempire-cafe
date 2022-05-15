import { ISort } from 'typings/api';
import { IUserOrdersInitialState } from './user-orders.typings';

export const userOrdersInitialState: IUserOrdersInitialState = {
  isWaitingOrders: false,
  selectedTab: 'waiting',
  managerOrders: [],
  sort: {
    label: 'sorting by',
    value: '5',
    field: 'default',
    order: 'ASC',
  } as ISort,
};
