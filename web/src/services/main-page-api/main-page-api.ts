import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';
import { transformProductsResponse } from '@utils/transform-response';
import { ICategories, IPaginateBody, TMenuResponse, TProductResponse } from 'typings/api';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
  baseQuery: baseQueryWithInterceptors,
  tagTypes: ['menu', 'product'],
  endpoints: (builder) => ({
    getMenus: builder.mutation<TMenuResponse, IPaginateBody>({
      query: (body) => ({
        url: `/menu/get-menus?page=${body.queries.page}&limit=${body.queries.limit || 10}`,
        method: 'POST',
        body: body.filter,
      }),
      transformResponse: (response: TMenuResponse) => transformProductsResponse(response),
      invalidatesTags: ['menu'],
    }),
    getProducts: builder.mutation<TProductResponse, IPaginateBody>({
      query: (body) => ({
        url: `/product/get-products?page=${body.queries.page}&limit=${body.queries.limit || 10}`,
        method: 'POST',
        body: body.filter,
      }),
      transformResponse: (response: TProductResponse) => transformProductsResponse(response),
      invalidatesTags: ['product'],
    }),
    getProductCategories: builder.query<ICategories, void>({
      query: () => ({
        url: `/product/get-product-categories`,
      }),
      providesTags: ['product'],
    }),
  }),
});

export const { useGetMenusMutation, useGetProductsMutation, useGetProductCategoriesQuery } = mainPageApi;
