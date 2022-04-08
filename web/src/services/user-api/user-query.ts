import {
    BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { RootState } from '@store/store';

import { userApi } from './user-api';

import { BASE_URL } from '@constants/config';
import { handleError } from '@constants/pop-up-messages';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    token && headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithInterceptors: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const userId = (api.getState() as RootState).user.user.id;
    api.dispatch(userApi.endpoints.logOut.initiate({ id: userId }));
  }
  if (result.error && result.error.status === 'FETCH_ERROR') {
    handleError({ message: 'Internet error' });
  }
  return result;
};
