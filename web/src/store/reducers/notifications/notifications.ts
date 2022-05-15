import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserOrderResponse } from 'typings/api';
import { notificationsInitialState } from './notifications.constants';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsInitialState,
  reducers: {
    notificationOrdersReceived(state, action: PayloadAction<IUserOrderResponse[]>) {
      state.notificationsOrders = action.payload;
    },

    countReceived(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

const { actions, reducer } = notificationsSlice;
export const { countReceived, notificationOrdersReceived } = actions;
export { reducer as notificationsReducer };
