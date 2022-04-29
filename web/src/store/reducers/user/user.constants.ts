import { handleError, handleSuccess } from '@constants/pop-up-messages';
import { TUserActionsNames, userApi } from '@services/user-api';
import { IError } from 'typings/api';
import { IUserInitialState, TBuilder } from './user.typings';

export const userInitialState: IUserInitialState = {
  token: '',
  user: {
    id: '',
    email: '',
    userName: '',
    phoneNumber: '',
    publicKey: '',
    logo: '',
    addresses: [],
    role: 'user',
  },
};

export const handleAuthDataFulfilled = (builder: TBuilder, api: TUserActionsNames) =>
  builder.addMatcher(userApi.endpoints[api].matchFulfilled, (state, { payload }) => {
    state.token = payload.token;
    state.user = payload.user;
    handleSuccess(api);
    if (api === 'logOut') {
      state.token = userInitialState.token;
      state.user = userInitialState.user;
    }
  });

export const handleAuthError = (builder: TBuilder, api: TUserActionsNames) =>
  builder.addMatcher(userApi.endpoints[api].matchRejected, (state, { payload }) => {
    const error = payload?.data as IError;
    handleError(error);
  });
