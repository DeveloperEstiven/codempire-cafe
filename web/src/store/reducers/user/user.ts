import { createSlice } from '@reduxjs/toolkit';

import { handleAuthDataFulfilled, handleAuthError, userInitialState } from './user.constants';

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAuthDataFulfilled(builder, 'logIn');
    handleAuthError(builder, 'logIn');
    handleAuthDataFulfilled(builder, 'signUp');
    handleAuthError(builder, 'signUp');
    handleAuthDataFulfilled(builder, 'logOut');
  },
});

const { actions, reducer } = userSlice;
export const {} = actions;
export { reducer as userReducer };
