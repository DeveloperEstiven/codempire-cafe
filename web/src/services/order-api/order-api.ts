import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';
import {
    IAddOrder, IUserDetailOrderResponse, IUserOrderResponse, TUpdateOrderResponse
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
      invalidatesTags: ['order', 'order-detail'],
    }),

    updateOrder: builder.mutation<TUpdateOrderResponse, Partial<TUpdateOrderResponse>>({
      query: (body) => ({
        url: `/order/update-order`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['order', 'order-detail'],
    }),

    getOrders: builder.query<IUserOrderResponse[], string>({
      query: () => ({ url: '/order/get-orders' }),
      providesTags: ['order'],
    }),

    getAllOrders: builder.query<IUserOrderResponse[], string>({
      query: () => ({ url: '/order/get-all-orders' }),
      providesTags: ['order'],
    }),

    getDetailOrder: builder.query<IUserDetailOrderResponse, string>({
      query: (orderNumber) => ({ url: `/order/get-orders/${orderNumber}` }),
      providesTags: ['order', 'order-detail'],
    }),

    getManagerDetailOrder: builder.query<IUserDetailOrderResponse, string>({
      query: (orderNumber) => ({ url: `/order/get-manager-detail-order/${orderNumber}` }),
      providesTags: ['order', 'order-detail'],
    }),

    getCompletedOrders: builder.query<IUserOrderResponse[], string>({
      query: () => ({ url: 'order/get-completed' }),
      providesTags: ['order'],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useGetDetailOrderQuery,
  useGetManagerDetailOrderQuery,
  useCancelOrderMutation,
  useUpdateOrderMutation,
  useGetCompletedOrdersQuery,
} = orderApi;
