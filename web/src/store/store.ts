import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { mainPageReducer } from './reducers/main-page';
import { userReducer } from './reducers/user';

import { userApi } from '@services/user-api';
import { mainPageApi } from '../services/main-page-api/main-page-api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainPage: mainPageReducer,
    [userApi.reducerPath]: userApi.reducer,
    [mainPageApi.reducerPath]: mainPageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
