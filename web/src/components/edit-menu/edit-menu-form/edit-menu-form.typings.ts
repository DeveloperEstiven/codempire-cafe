import { FormikHelpers } from 'formik';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { IMenu, IUpdateMenu, TAddMenu } from 'typings/api';

export interface IEditMenuForm {
  image: string;
  name: string;
  description: string;
  price: string;
  products: IDropdownData[];
}

export type THandleEditMenuSubmit = (values: IEditMenuForm, actions: FormikHelpers<IEditMenuForm>) => void;

export type THandleEditMenu = (values: IUpdateMenu | TAddMenu, actions: FormikHelpers<IEditMenuForm>) => void;

export interface IEditMenuFormProps {
  onEditMenu: THandleEditMenu;
  menu?: IMenu;
}
