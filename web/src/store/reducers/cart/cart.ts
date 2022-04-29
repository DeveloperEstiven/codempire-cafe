import { successMixin } from '@constants/pop-up-messages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMenu, IProduct } from 'typings/api';
import { cartInitialState } from './cart.constants';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItem: (state, action: PayloadAction<IProduct | IMenu>) => {
      state.cart.push({
        product: action.payload,
        count: 1,
      });
      successMixin({ title: `${action.payload.name} added to cart` }).fire();
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter(({ product, count }) => {
        if (product.id !== action.payload.id) {
          return true;
        }
        successMixin({ title: `${product.name} removed from cart` }).fire();
        state.totalItems -= count;
        state.totalPrice -= product.price * count;
      });
      return state;
    },

    increment: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cart.findIndex(({ product }) => {
        if (product.id === action.payload.id) {
          state.totalPrice += product.price;
          return true;
        }
      });
      state.cart[itemIndex].count += 1;
      state.totalItems += 1;
    },

    decrement: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cart.findIndex(({ product }) => {
        if (product.id === action.payload.id) {
          state.totalPrice -= product.price;
          return true;
        }
      });
      state.cart[itemIndex].count -= 1;
      state.totalItems -= 1;
    },
  },
});
const { actions, reducer } = cartSlice;
export const { addItem, removeItem, increment, decrement } = actions;
export { reducer as cartReducer };
