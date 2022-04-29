import { getFormattedDate } from '@utils/date';
import { IGroupOrders, IOrderGroup, IUserOrderResponse } from 'typings/api';
import { TRawGroups } from './orders-page.typings';

export const groupOrdersByDate = (orders: IUserOrderResponse[]): IOrderGroup[] => {
  const groups = orders.reduce((group: TRawGroups, order) => {
    const date = getFormattedDate(order.date);
    if (!group[date]) group[date] = [];
    group[date].push(order);
    return group;
  }, {});

  return Object.keys(groups).map((date) => ({
    date,
    orders: groups[date],
  }));
};

export const getGroupOrders = (orders?: IUserOrderResponse[]): IGroupOrders => {
  const waitingOrders = orders?.filter((order) => order.status !== 'delivered') || [];
  const completedOrders = orders?.filter((order) => order.status == 'delivered') || [];

  return {
    waitingOrders: groupOrdersByDate(waitingOrders),
    completedOrders: groupOrdersByDate(completedOrders),
  };
};
