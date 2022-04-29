import { getPersistConfig } from 'redux-deep-persist';
import { persistReducer } from 'redux-persist';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from '@services/user-api';
import storage from 'redux-persist/lib/storage';
import { mainPageApi } from '../services/main-page-api/main-page-api';
import { profilePageApi } from '../services/profile-page-api/profile-page-api';
import { cartReducer } from './reducers/cart';
import { mainPageReducer } from './reducers/main-page';
import { userReducer } from './reducers/user';

const reducers = combineReducers({
  user: userReducer,
  mainPage: mainPageReducer,
  cart: cartReducer,
  [userApi.reducerPath]: userApi.reducer,
  [mainPageApi.reducerPath]: mainPageApi.reducer,
  [profilePageApi.reducerPath]: profilePageApi.reducer,
});

const config = getPersistConfig({
  key: 'root',
  storage,
  blacklist: ['userApi', 'mainPageApi', 'profilePageApi'],
  rootReducer: reducers,
});

const persistedReducer = persistReducer(config, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, mainPageApi.middleware, profilePageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
