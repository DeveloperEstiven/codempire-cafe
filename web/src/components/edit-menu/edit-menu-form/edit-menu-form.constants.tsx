import * as Yup from 'yup';

import { error } from '@constants/errors';
import { multiSelectValidation, stringRequired } from '@constants/validation-schemas';
import { IEditMenuInitialState } from '@store/reducers/edit-item/edit-item.typings';
import { transformToDropdownData } from '@utils/arrayToDropdownData';
import { IMenu } from 'typings/api';
import { IEditMenuForm } from './edit-menu-form.typings';

export const getInitialValues = (persisted: IEditMenuInitialState, menu?: IMenu): IEditMenuForm => {
  const { name, description, price, products, image } = persisted;

  return {
    image: image || menu?.image || '',
    name: name || menu?.name || '',
    description: description || menu?.description || '',
    price: price || menu?.price.toString() || '',
    products: products[0]?.value ? products : transformToDropdownData(menu?.products || []) || [],
  };
};

export const categories = [
  { value: 'food', label: 'Food' },
  { value: 'drink', label: 'Drink' },
] as const;

export const editMenuValidationSchema = Yup.object<Record<keyof IEditMenuForm, Yup.AnySchema>>({
  image: stringRequired('Image'),
  name: stringRequired('Name'),
  description: stringRequired('Description').max(300, error(300).max),
  price: stringRequired('Price'),
  products: multiSelectValidation('Pick at least 1 product'),
});
