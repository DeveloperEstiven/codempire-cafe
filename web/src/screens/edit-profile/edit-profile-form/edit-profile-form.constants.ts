import * as Yup from 'yup';

import { error } from '@constants/errors';
import { REGEXPS } from '@constants/reg-exp';
import { logInValidationRules } from '@screens/log-in/log-in-form/log-in-form.constants';

export const imgTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];
// export const {password, ...editProfileValidationRules} = signUpValidationRules //TODO: signUpValidationRules
export const editProfileValidationSchema = Yup.object({
  email: logInValidationRules.email,
  phoneNumber: Yup.string()
    .matches(REGEXPS.phone, error('phone number').valid)
    .required(error('phone number').required),
  userName: Yup.string().matches(REGEXPS.name, error().name).max(50, error(50).max).required(error('name').required),
});
