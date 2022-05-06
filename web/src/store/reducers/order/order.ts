import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITime, TRadioValues } from 'typings/api';
import { orderInitialState } from './order.constants';

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    selectedRadioReceived(state, action: PayloadAction<TRadioValues>) {
      state.selectedRadio = action.payload;
    },
    selectedTimeReceived(state, action: PayloadAction<ITime>) {
      state.selectedTime = action.payload;
    },
    selectedDateReceived(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
    },
    selectedAddressReceived(state, action: PayloadAction<string>) {
      state.selectedAddress = action.payload;
    },
    commentReceived(state, action: PayloadAction<string>) {
      state.comment = action.payload;
    },
    clearOrderState() {
      return orderInitialState;
    },
  },
});

const { actions, reducer } = orderSlice;
export const {
  selectedRadioReceived,
  selectedTimeReceived,
  selectedDateReceived,
  selectedAddressReceived,
  commentReceived,
  clearOrderState,
} = actions;
export { reducer as orderReducer };
