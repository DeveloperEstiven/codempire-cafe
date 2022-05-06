import * as Yup from 'yup';

import { error } from '@constants/errors';

export const radioButtons = [
  { value: 'now', label: 'Right now' },
  { value: 'later', label: 'Choose date and time of delivery' },
] as const;

export const OrderValidationSchema = Yup.object({
  comment: Yup.string().max(300, error(300).max),
  address: Yup.object().shape({
    value: Yup.string().required(error('address').required),
  }),
  deliveryDate: Yup.date().typeError(error('date').required).required(error('date').required),
});
