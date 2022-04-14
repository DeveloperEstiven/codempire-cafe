import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';
import { IMenuResponse, IProductResponse } from 'typings/api';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
  baseQuery: baseQueryWithInterceptors,

  endpoints: (builder) => ({
    getAllMenus: builder.query<IMenuResponse[], void>({
      query: () => ({
        url: '/menu/get-all-menus',
        method: 'GET',
      }),
    }),
    getAllProducts: builder.query<IProductResponse[], void>({
      query: () => ({
        url: '/product/get-all-products',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllMenusQuery, useLazyGetAllProductsQuery } = mainPageApi;
