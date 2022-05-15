import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { TCategories } from '@components/edit-product/edit-product-form/edit-product-form.typings';

export interface IEditItemInitialState {
  product: IEditProductInitialState;
  menu: IEditMenuInitialState;
}

export interface IEditProductInitialState {
  image: string;
  name: string;
  weight: string;
  description: string;
  newSubcategoryValue: string;
  isNewSubcategoryVisible: boolean;
  price: string;
  category: TCategories;
  ingredients: IDropdownData[];
}

export interface IEditMenuInitialState {
  image: string;
  name: string;
  description: string;
  price: string;
  products: IDropdownData[];
}
