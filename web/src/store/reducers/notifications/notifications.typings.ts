export interface INotificationsInitialState {
  completedOrders: ICompletedOrder[];
  isNotificationsExists: boolean;
}

export interface ICompletedOrder {
  id: string;
  orderNumber: number;
  isRated: boolean;
  rating: number | null;
  customerFeedback: string;
  date: string;
}

export interface IReceivedRatedOrder {
  id: string;
  customerFeedback: string;
  rating: number;
}
