import * as Yup from 'yup';

import { error } from '@constants/errors';
import { REGEXPS } from '@constants/reg-exp';

const passwordValidationRules = Yup.string()
  .min(8, error(8).min)
  .matches(REGEXPS.password, error().password)
  .required(error('password').required);

export const changePasswordValidationSchema = Yup.object({
  oldPassword: passwordValidationRules,
  newPassword: passwordValidationRules,
  approvedPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export const changePasswordInitialValues = {
  oldPassword: '',
  newPassword: '',
  approvedPassword: '',
};
