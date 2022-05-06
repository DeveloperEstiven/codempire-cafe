import { FormikHelpers } from 'formik';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { IAddress } from 'typings/api';

export interface IOrderForm {
  comment: string;
  address: IDropdownData;
  deliveryDate: Date;
}
export interface IOrderFormSubmit extends Omit<IOrderForm, 'address'> {
  address: IAddress;
}

export type THandleOrder = (values: IOrderForm, actions: FormikHelpers<IOrderForm>) => void;
export type THandleOrderSubmit = (values: IOrderFormSubmit, actions: FormikHelpers<IOrderForm>) => void;

export interface IOrderFormProps {
  onOrder: THandleOrderSubmit;
}
