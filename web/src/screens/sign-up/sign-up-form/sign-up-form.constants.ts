import * as Yup from 'yup';

import { error } from '@constants/errors';
import { REGEXPS } from '@constants/reg-exp';
import {
    logInInitialValues, logInValidationRules
} from '@screens/log-in/log-in-form/log-in-form.constants';
import { IUserSignUp } from '@services/user-api/user-api.typings';

export const signUpValidationRules = {
  ...logInValidationRules,
  phoneNumber: Yup.string()
    .matches(REGEXPS.phone, error('phone number').valid)
    .required(error('phone number').required),

  userName: Yup.string().matches(REGEXPS.name, error().name).max(50, error(50).max).required(error('name').required),
};

export const signUpValidationSchema = Yup.object(signUpValidationRules);

export const signUpInitialValues: IUserSignUp = {
  userName: '',
  phoneNumber: '',
  ...logInInitialValues,
};

export const signUpFieldNames = Object.keys(signUpInitialValues) as (keyof IUserSignUp)[];
