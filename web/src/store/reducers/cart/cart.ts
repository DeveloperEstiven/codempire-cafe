import { successMixin } from '@constants/pop-up-messages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMenu, IProduct } from 'typings/api';
import { cartInitialState } from './cart.constants';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItem: (state, action: PayloadAction<IProduct | IMenu>) => {
      if ('weight' in action.payload) {
        state.cart.products.push({
          product: action.payload,
          count: 1,
        });
      } else {
        state.cart.menus.push({
          menu: action.payload,
          count: 1,
        });
      }
      successMixin({ title: `${action.payload.name} added to cart` }).fire();
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cart.products = state.cart.products.filter(({ product, count }) => {
        if (product.id !== action.payload.id) {
          return true;
        }
        successMixin({ title: `${product.name} removed from cart` }).fire();
        state.totalItems -= count;
        state.totalPrice -= product.price * count;
      });

      state.cart.menus = state.cart.menus.filter(({ menu, count }) => {
        if (menu.id !== action.payload.id) {
          return true;
        }
        successMixin({ title: `${menu.name} removed from cart` }).fire();
        state.totalItems -= count;
        state.totalPrice -= menu.price * count;
      });
      return state;
    },

    increment: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.cart.products.findIndex(({ product }) => {
        if (product.id === action.payload.id) {
          state.totalPrice += product.price;
          return true;
        }
      });
      if (productIndex !== -1) {
        state.cart.products[productIndex].count += 1;
      }
      const menuIndex = state.cart.menus.findIndex(({ menu }) => {
        if (menu.id === action.payload.id) {
          state.totalPrice += menu.price;
          return true;
        }
      });
      if (menuIndex !== -1) {
        state.cart.menus[menuIndex].count += 1;
      }
      state.totalItems += 1;
    },

    decrement: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.cart.products.findIndex(({ product }) => {
        if (product.id === action.payload.id) {
          state.totalPrice -= product.price;
          return true;
        }
      });
      if (productIndex !== -1) {
        state.cart.products[productIndex].count -= 1;
      }
      const menuIndex = state.cart.menus.findIndex(({ menu }) => {
        if (menu.id === action.payload.id) {
          state.totalPrice -= menu.price;
          return true;
        }
      });
      if (menuIndex !== -1) {
        state.cart.menus[menuIndex].count -= 1;
      }
      state.totalItems -= 1;
    },

    clearCart: () => {
      return cartInitialState;
    },
  },
});
const { actions, reducer } = cartSlice;
export const { addItem, removeItem, increment, decrement, clearCart } = actions;
export { reducer as cartReducer };
