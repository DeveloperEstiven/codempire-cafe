import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSelectedType } from '@screens/orders-page/orders-page.typings';
import { ISort, IUserOrderResponse } from 'typings/api';
import { userOrdersInitialState } from './user-orders.constants';

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState: userOrdersInitialState,
  reducers: {
    isWaitingOrderReceived(state, action: PayloadAction<boolean>) {
      state.isWaitingOrders = action.payload;
    },
    selectedTabReceived(state, action: PayloadAction<TSelectedType>) {
      state.selectedTab = action.payload;
    },
    managerOrdersReceived(state, action: PayloadAction<IUserOrderResponse[]>) {
      state.managerOrders = action.payload;
    },
    setSort(store, action: PayloadAction<ISort>) {
      store.sort = action.payload;
    },
  },
});
const { actions, reducer } = userOrdersSlice;
export const { isWaitingOrderReceived, selectedTabReceived, managerOrdersReceived, setSort } = actions;
export { reducer as userOrdersReducer };
