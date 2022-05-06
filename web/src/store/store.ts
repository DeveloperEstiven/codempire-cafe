import { persistReducer } from 'redux-persist';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from '@services/user-api';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { mainPageApi } from '../services/main-page-api';
import { orderApi } from '../services/order-api';
import { profilePageApi } from '../services/profile-page-api';
import { cartReducer } from './reducers/cart';
import { mainPageReducer } from './reducers/main-page';
import { notificationsReducer } from './reducers/notifications';
import { orderReducer } from './reducers/order';
import { userReducer } from './reducers/user';

const config = {
  key: 'root',
  storage,
  blacklist: ['userApi', 'mainPageApi', 'profilePageApi', 'orderApi', 'order'],
};

const sessionConfig = {
  key: 'order',
  storage: sessionStorage,
};

const reducers = combineReducers({
  user: userReducer,
  mainPage: mainPageReducer,
  cart: cartReducer,
  order: persistReducer(sessionConfig, orderReducer),
  notifications: notificationsReducer,
  [userApi.reducerPath]: userApi.reducer,
  [mainPageApi.reducerPath]: mainPageApi.reducer,
  [profilePageApi.reducerPath]: profilePageApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

const persistedReducer = persistReducer(config, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, mainPageApi.middleware, profilePageApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
