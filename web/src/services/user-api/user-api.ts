import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';

import { IUserLogIn, IUserResponse, IUserSignUp } from './user-api.typings';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithInterceptors,

  endpoints: (builder) => ({
    signUp: builder.mutation<IUserResponse, IUserSignUp>({
      query: (body) => ({
        url: '/user-auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    logIn: builder.mutation<IUserResponse, IUserLogIn>({
      query: (body) => ({
        url: '/user-auth/log-in',
        method: 'POST',
        body,
      }),
    }),

    logOut: builder.mutation<{ message: string }, { id: string }>({
      query: (body) => ({
        url: '/user-auth/log-out',
        method: 'POST',
        body,
      }),
    }),
  }),
});

const userApiActionsNames = Object.keys(userApi.endpoints) as Array<keyof typeof userApi.endpoints>;
export type TUserActionsNames = typeof userApiActionsNames[number];

export const { useSignUpMutation, useLogInMutation, useLogOutMutation } = userApi;
