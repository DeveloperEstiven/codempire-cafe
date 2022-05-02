import { FormikHelpers } from 'formik';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { radioButtons } from './order-page-form.constants';

export type TRadioValues = typeof radioButtons[number]['value'];

export interface IOrderForm {
  comment: string;
  address: IDropdownData;
  deliveryDate: Date;
}

export type THandleOrderSubmit = (values: IOrderForm, actions: FormikHelpers<IOrderForm>) => void;

export interface IOrderFormProps {
  onOrder: THandleOrderSubmit;
}
