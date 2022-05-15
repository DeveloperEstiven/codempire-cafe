import { CSSObjectWithLabel } from 'react-select';

import { sortingStyles } from '@components/data-organizer/data-organizer.styles';
import { getGroups } from '@utils/group-data';
import { IGroupOrders, IOrderGroup, ISort, IUserOrderResponse } from 'typings/api';

export const groupOrdersByDate = (orders: IUserOrderResponse[]) => getGroups({ orders });

export const getGroupOrders = (orders?: IUserOrderResponse[]): IGroupOrders => {
  const waitingOrders = orders?.filter((order) => order.status !== 'delivered') || [];
  const completedOrders = orders?.filter((order) => order.status == 'delivered') || [];
  return {
    waitingOrders: groupOrdersByDate(waitingOrders) as unknown as IOrderGroup[],
    completedOrders: groupOrdersByDate(completedOrders) as unknown as IOrderGroup[],
  };
};

export const sortItems: ISort[] = [
  { label: 'price', icon: 'arrowUp', value: '1', field: 'price', order: 'ASC' },
  { label: 'price', icon: 'arrowBottom', value: '2', field: 'price', order: 'DESC' },
  { label: 'date', icon: 'arrowUp', value: '3', field: 'date', order: 'ASC' },
  { label: 'date', icon: 'arrowBottom', value: '4', field: 'date', order: 'DESC' },
  { label: 'sorting by', value: '5', field: 'default', order: 'ASC' },
];

export const sortingStyle = {
  ...sortingStyles,
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    right: '0',
    minWidth: '135px',
  }),
};

export const sortOrders = (
  selectedSort: ISort = {
    label: 'sorting by',
    value: '5',
    field: 'default',
    order: 'ASC',
  },
  orders: IOrderGroup[]
) => {
  const { field, order } = selectedSort;
  if (field === 'date' && order === 'ASC') return sortDateAsc(orders);
  else if (field === 'date' && order === 'DESC') return sortDateDesc(orders);
  else if (field === 'price' && order === 'ASC') return sortPriceAsc(orders);
  else if (field === 'price' && order === 'DESC') return sortPriceDesc(orders);

  return orders;
};

const sortDateAsc = (ordersGroup: IOrderGroup[]) => {
  const newOrdersGroup: IOrderGroup[] = [];
  ordersGroup.forEach((group) => {
    const sortedOrders = group.orders.sort(function (a, b) {
      const dateA = new Date(b.date).getTime().toString();
      const dateB = new Date(a.date).getTime().toString();
      return dateA.localeCompare(dateB);
    });
    newOrdersGroup.push({
      date: group.date,
      orders: sortedOrders,
    });
  });
  return newOrdersGroup.sort(function (a, b) {
    const parsedA = b.date.split(', ')[1].split('/').reverse().join(',');
    const parsedB = a.date.split(', ')[1].split('/').reverse().join(',');

    const dateA = new Date(parsedA).getTime().toString();
    const dateB = new Date(parsedB).getTime().toString();
    return dateA.localeCompare(dateB);
  });
};

const sortDateDesc = (ordersGroup: IOrderGroup[]) => {
  const newOrdersGroup: IOrderGroup[] = [];
  ordersGroup.forEach((group) => {
    const sortedOrders = group.orders.sort(function (a, b) {
      const dateA = new Date(a.date).getTime().toString();
      const dateB = new Date(b.date).getTime().toString();
      return dateA.localeCompare(dateB);
    });
    newOrdersGroup.push({
      date: group.date,
      orders: sortedOrders,
    });
  });
  return newOrdersGroup.sort(function (a, b) {
    const parsedA = a.date.split(', ')[1].split('/').reverse().join(',');
    const parsedB = b.date.split(', ')[1].split('/').reverse().join(',');

    const dateA = new Date(parsedA).getTime().toString();
    const dateB = new Date(parsedB).getTime().toString();
    return dateA.localeCompare(dateB);
  });
};

const sortPriceDesc = (ordersGroup: IOrderGroup[]) => {
  const newOrdersGroup = ordersGroup.map((group) => {
    const sortedOrders = group.orders.sort((a, b) => a.price - b.price);
    const pricePerDay = group.orders.reduce((acc, item) => (acc += item.price), 0);
    return {
      date: group.date,
      orders: sortedOrders,
      pricePerDay,
    };
  });

  return newOrdersGroup.sort((a, b) => a.pricePerDay - b.pricePerDay);
};

const sortPriceAsc = (ordersGroup: IOrderGroup[]) => {
  const newOrdersGroup = ordersGroup.map((group) => {
    const sortedOrders = group.orders.sort((a, b) => b.price - a.price);
    const pricePerDay = group.orders.reduce((acc, item) => (acc += item.price), 0);
    return {
      date: group.date,
      orders: sortedOrders,
      pricePerDay,
    };
  });
  return newOrdersGroup.sort((a, b) => b.pricePerDay - a.pricePerDay);
};
