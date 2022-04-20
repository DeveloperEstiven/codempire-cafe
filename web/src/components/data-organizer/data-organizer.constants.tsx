import { ISort } from 'typings/api';

export const sortItems: ISort[] = [
  { label: 'price', icon: 'arrowUp', value: '1', field: 'price', order: 'ASC' },
  { label: 'price', icon: 'arrowBottom', value: '2', field: 'price', order: 'DESC' },
  { label: 'name', icon: 'arrowUp', value: '3', field: 'name', order: 'ASC' },
  { label: 'name', icon: 'arrowBottom', value: '4', field: 'name', order: 'DESC' },
  { label: 'sorting by', value: '5', field: 'default', order: 'ASC' },
];
