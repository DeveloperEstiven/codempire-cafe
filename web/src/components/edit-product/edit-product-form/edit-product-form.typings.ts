import { FormikHelpers } from 'formik';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { IProduct, IUpdateProduct, TAddProduct } from 'typings/api';
import { categories } from './edit-product-form.constants';

export interface IEditProductForm {
  image: string;
  name: string;
  weight: string;
  description: string;
  price: string;
  category: string;
  subcategory: IDropdownData;
  ingredients: IDropdownData[];
}

export type TCategories = typeof categories[number]['value'];

export type THandleEditProductSubmit = (values: IEditProductForm, actions: FormikHelpers<IEditProductForm>) => void;

export type THandleEditProduct = (
  values: IUpdateProduct | TAddProduct,
  actions: FormikHelpers<IEditProductForm>
) => void;

export interface IEditProductFormProps {
  onEditProduct: THandleEditProduct;
  product?: IProduct;
}
