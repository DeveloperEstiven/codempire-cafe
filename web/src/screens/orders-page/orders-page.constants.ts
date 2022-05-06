import { getGroups } from '@utils/group-data';
import { IGroupOrders, IOrderGroup, IUserOrderResponse } from 'typings/api';

export const groupOrdersByDate = (orders: IUserOrderResponse[]) => getGroups({ orders });

export const getGroupOrders = (orders?: IUserOrderResponse[]): IGroupOrders => {
  const waitingOrders = orders?.filter((order) => order.status !== 'delivered') || [];
  const completedOrders = orders?.filter((order) => order.status == 'delivered') || [];
  return {
    waitingOrders: groupOrdersByDate(waitingOrders) as unknown as IOrderGroup[],
    completedOrders: groupOrdersByDate(completedOrders) as unknown as IOrderGroup[],
  };
};
