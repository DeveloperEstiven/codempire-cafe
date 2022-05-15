import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptors } from '@services/base-query-with-interceptors';
import { transformItemResponse, transformItemsResponse } from '@utils/transform-response';
import {
    ICategories, ICreateIngredient, IIngredient, IMenu, IPaginateBody, IProduct, IUpdateMenu,
    IUpdateProduct, TAddMenu, TAddProduct, TMenuResponse, TProductResponse
} from 'typings/api';
import { getFilterUrl } from './main-page-api.constants';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
  baseQuery: baseQueryWithInterceptors,
  tagTypes: ['menu', 'product', 'categories', 'ingredient'],
  endpoints: (builder) => ({
    getMenus: builder.query<TMenuResponse, IPaginateBody>({
      query: (body) => getFilterUrl('menu/get-menus', body),
      transformResponse: (response: TMenuResponse) => transformItemsResponse(response),
      providesTags: ['menu'],
    }),
    getProducts: builder.query<TProductResponse, IPaginateBody>({
      query: (body) => getFilterUrl('product/get-products', body),
      transformResponse: (response: TProductResponse) => transformItemsResponse(response),
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/product/get-product/${id}`,
      }),
      transformResponse: (response: IProduct) => transformItemResponse(response),
    }),
    getMenu: builder.query<IMenu, string>({
      query: (id) => ({
        url: `/menu/get-menu/${id}`,
      }),
      transformResponse: (response: IMenu) => transformItemResponse(response),
    }),
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `/product/get-all-products`,
      }),
    }),
    deleteProduct: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/product/remove-product/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteMenu: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/menu/remove-menu/${id}`,
        method: 'DELETE',
      }),
    }),
    addProduct: builder.mutation<IProduct, TAddProduct>({
      query: (body) => ({
        url: `/product/add-product/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['categories', 'ingredient'],
    }),
    addMenu: builder.mutation<IMenu, TAddMenu>({
      query: (body) => ({
        url: `/menu/add-menu/`,
        method: 'POST',
        body,
      }),
    }),
    checkProductIsInMenu: builder.query<IMenu[], string>({
      query: (id) => ({
        url: `/product/check-product-contains/${id}`,
      }),
    }),
    updateProduct: builder.mutation<IProduct, IUpdateProduct>({
      query: (body) => ({
        url: `/product/update-product`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['categories', 'ingredient'],
    }),
    updateMenu: builder.mutation<IMenu, IUpdateMenu>({
      query: (body) => ({
        url: `/menu/update-menu`,
        method: 'PUT',
        body,
      }),
    }),
    getProductCategories: builder.query<ICategories, void>({
      query: () => ({
        url: `/product/get-product-categories`,
      }),
      providesTags: ['categories'],
    }),
    getAllIngredients: builder.query<IIngredient[], void>({
      query: () => ({
        url: `/ingredient/get-all-ingredients`,
      }),
      providesTags: ['ingredient'],
    }),
    addIngredient: builder.mutation<IIngredient, ICreateIngredient>({
      query: (body) => ({
        url: `/ingredient/add-ingredient`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ingredient'],
    }),
    removeIngredient: builder.mutation<{ message: string }, { id: string }>({
      query: (body) => ({
        url: `/ingredient/remove-ingredient/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ingredient'],
    }),
    checkIngredientIsInProduct: builder.query<IProduct[], string>({
      query: (id) => ({
        url: `/ingredient/check-ingredient-contains/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useAddMenuMutation,
  useLazyGetMenusQuery,
  useLazyGetMenuQuery,
  useLazyGetProductsQuery,
  useGetProductCategoriesQuery,
  useLazyGetProductCategoriesQuery,
  useGetAllIngredientsQuery,
  useDeleteProductMutation,
  useDeleteMenuMutation,
  useCheckProductIsInMenuQuery,
  useLazyCheckProductIsInMenuQuery,
  useUpdateProductMutation,
  useUpdateMenuMutation,
  useAddIngredientMutation,
  useRemoveIngredientMutation,
  useLazyCheckIngredientIsInProductQuery,
  useLazyGetProductQuery,
} = mainPageApi;
