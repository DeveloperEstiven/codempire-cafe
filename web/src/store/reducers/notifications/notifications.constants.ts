import { INotificationsInitialState } from './notifications.typings';

export const notificationsInitialState: INotificationsInitialState = {
  completedOrders: [],
  isNotificationsExists: false,
};

export const checkIsNotificationsExists = (state: INotificationsInitialState) => {
  state.isNotificationsExists = state.completedOrders.filter((order) => !order.isRated).length > 0;
};
