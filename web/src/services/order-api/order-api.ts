import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';
import {
    IAddOrder, IOrderFeedback, IUserDetailOrderResponse, IUserOrderResponse, TUpdateOrderResponse
} from 'typings/api';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithInterceptors,
  tagTypes: ['order', 'order-detail'],

  endpoints: (builder) => ({
    addOrder: builder.mutation<IUserDetailOrderResponse, IAddOrder>({
      query: (body) => ({
        url: `/order/add-order`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['order'],
    }),

    cancelOrder: builder.mutation<{ message: string }, { id: string }>({
      query: (body) => ({
        url: `/order/cancel-order`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['order'],
    }),

    addOrderFeedback: builder.mutation<TUpdateOrderResponse, IOrderFeedback>({
      query: (body) => ({
        url: `/order/update-order`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['order-detail'],
    }),

    getOrders: builder.query<IUserOrderResponse[], void>({
      query: () => ({ url: '/order/get-orders' }),
      providesTags: ['order'],
    }),

    getDetailOrder: builder.query<IUserDetailOrderResponse, string>({
      query: (orderNumber) => ({ url: `/order/get-orders/${orderNumber}` }),
      providesTags: ['order-detail'],
    }),

    getCompletedOrders: builder.query<IUserOrderResponse[], void>({
      query: () => ({ url: 'order/get-completed' }),
      providesTags: ['order'],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetDetailOrderQuery,
  useCancelOrderMutation,
  useAddOrderFeedbackMutation,
  useLazyGetCompletedOrdersQuery,
} = orderApi;
