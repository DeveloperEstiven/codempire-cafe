import * as Yup from 'yup';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { error } from '@constants/errors';
import { multiSelectValidation, stringRequired } from '@constants/validation-schemas';
import { IEditProductInitialState } from '@store/reducers/edit-item/edit-item.typings';
import { transformToDropdownData } from '@utils/arrayToDropdownData';
import { ICategories, IProduct } from 'typings/api';
import { IEditProductForm, TCategories } from './edit-product-form.typings';

export const getSubcategories = (subcategories: ICategories, selectedCategory: TCategories): IDropdownData[] =>
  subcategories[selectedCategory]?.map((name) => ({
    label: name,
    value: name,
  })) || [];

export const getSubcategory = (
  subcategories: ICategories,
  selectedCategory: TCategories,
  name?: string
): IDropdownData =>
  getSubcategories(subcategories, selectedCategory)?.find((subcategory) => subcategory.value === name) ||
  ({} as IDropdownData);

export const getInitialValues = (
  subcategories: ICategories,
  selectedCategory: TCategories,
  persisted: IEditProductInitialState,
  product?: IProduct
): IEditProductForm => {
  const { name, weight, description, price, category, ingredients, image } = persisted;

  return {
    image: image || product?.image || '',
    name: name || product?.name || '',
    description: description || product?.description || '',
    price: price || product?.price.toString() || '',
    weight: weight || product?.weight || '',
    ingredients: ingredients[0]?.value ? ingredients : transformToDropdownData(product?.ingredients || []) || [],
    category: category || product?.category || 'food',
    subcategory: getSubcategory(subcategories, selectedCategory, product?.subcategory),
  };
};

export const categories = [
  { value: 'food', label: 'Food' },
  { value: 'drink', label: 'Drink' },
] as const;

export const editProductValidationSchema = Yup.object<Record<keyof IEditProductForm, Yup.AnySchema>>({
  image: stringRequired('Image'),
  name: stringRequired('Name'),
  description: stringRequired('Description').max(300, error(300).max),
  weight: stringRequired('Weight'),
  price: stringRequired('Price'),
  category: stringRequired('Category'),
  ingredients: multiSelectValidation('Pick at least 1 ingredient'),
  subcategory: Yup.object().shape({
    value: stringRequired('Subcategory'),
  }),
});
