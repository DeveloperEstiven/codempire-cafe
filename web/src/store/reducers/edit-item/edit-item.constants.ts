import { TCategories } from '@components/edit-product/edit-product-form/edit-product-form.typings';
import { IEditItemInitialState } from './edit-item.typings';

export const editItemInitialState: IEditItemInitialState = {
  product: {
    name: '',
    image: '',
    weight: '',
    description: '',
    price: '',
    category: '' as TCategories,
    newSubcategoryValue: '',
    isNewSubcategoryVisible: false,
    ingredients: [
      {
        value: '',
        label: '',
      },
    ],
  },
  menu: {
    name: '',
    image: '',
    description: '',
    price: '',
    products: [
      {
        value: '',
        label: '',
      },
    ],
  },
};
