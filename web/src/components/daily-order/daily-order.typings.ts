export interface IDailyOrderProps {
  orders: IOrder[];
  day: number;
}

export interface IOrder {
  orderNumber: number;
  time: string;
  description: string;
}
