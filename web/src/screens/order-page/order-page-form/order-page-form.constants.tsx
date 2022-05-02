import * as Yup from 'yup';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { error } from '@constants/errors';
import { IOrderForm } from './order-page-form.typings';

//FIXME
export const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const radioButtons = [
  { value: 'now', label: 'Right now' },
  { value: 'later', label: 'Choose date and time of delivery' },
] as const;

export const OrderInitialValues: IOrderForm = {
  comment: '',
  address: options[0] as IDropdownData, //FIXME
  deliveryDate: new Date(),
};

export const OrderValidationSchema = Yup.object({
  comment: Yup.string().max(300, error(300).max),
  address: Yup.object().shape({
    value: Yup.string().required(error('address').required),
  }),
  deliveryDate: Yup.date().typeError(error('date').required).required(error('date').required),
});
