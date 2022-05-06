import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';
import { transformUserResponse } from '@utils/transform-response';
import { IAddAddresses, IAddress, IChangePassword, IEditProfile, IUser } from 'typings/api';

export const profilePageApi = createApi({
  reducerPath: 'profilePageApi',
  baseQuery: baseQueryWithInterceptors,

  endpoints: (builder) => ({
    changePassword: builder.mutation<{ message: string }, IChangePassword>({
      query: (body) => ({
        url: '/user/change-password',
        method: 'POST',
        body,
      }),
    }),
    editProfile: builder.mutation<IUser, IEditProfile>({
      query: (body) => ({
        url: '/user/update-user',
        method: 'PUT',
        body,
      }),
      transformResponse: (response: IUser) => transformUserResponse(response),
    }),
    addAddresses: builder.mutation<IAddress[], IAddAddresses>({
      query: (body) => ({
        url: '/address/add-address',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useChangePasswordMutation, useEditProfileMutation, useAddAddressesMutation } = profilePageApi;
