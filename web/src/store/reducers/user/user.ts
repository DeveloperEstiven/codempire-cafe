import { createSlice } from '@reduxjs/toolkit';
import { profilePageApi } from '@services/profile-page-api';
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
    builder.addMatcher(profilePageApi.endpoints.editProfile.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addMatcher(profilePageApi.endpoints.addAddresses.matchFulfilled, (state, { payload }) => {
      state.user.addresses = payload;
    });
  },
});

const { actions, reducer } = userSlice;
export const {} = actions;
export { reducer as userReducer };
