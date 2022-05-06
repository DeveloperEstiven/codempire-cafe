import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkIsNotificationsExists, notificationsInitialState } from './notifications.constants';
import { ICompletedOrder, IReceivedRatedOrder } from './notifications.typings';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsInitialState,
  reducers: {
    completedOrderReceived(state, action: PayloadAction<ICompletedOrder>) {
      state.completedOrders.unshift(action.payload);
      checkIsNotificationsExists(state);
    },

    ratedOrderReceived(state, action: PayloadAction<IReceivedRatedOrder>) {
      const orderIndex = state.completedOrders.findIndex((order) => order.id === action.payload.id)!;
      if (orderIndex !== -1) {
        state.completedOrders[orderIndex] = { ...state.completedOrders[orderIndex], isRated: true, ...action.payload };
      }
      checkIsNotificationsExists(state);
    },
  },
});

const { actions, reducer } = notificationsSlice;
export const { completedOrderReceived, ratedOrderReceived } = actions;
export { reducer as notificationsReducer };
