import * as Yup from 'yup';

import { error } from '@constants/errors';
import { REGEXPS } from '@constants/reg-exp';
import { IChangePasswordForm } from './change-password-form.typings';

const passwordValidationRules = Yup.string()
  .min(8, error(8).min)
  .matches(REGEXPS.password, error().password)
  .required(error('password').required);

export const changePasswordValidationSchema = Yup.object({
  oldPassword: passwordValidationRules,
  newPassword: passwordValidationRules,
  approvedPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required(error('password').required),
});

export const changePasswordInitialValues: IChangePasswordForm = {
  oldPassword: '',
  newPassword: '',
  approvedPassword: '',
};
