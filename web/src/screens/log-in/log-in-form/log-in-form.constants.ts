import * as Yup from 'yup';

import { IUserLogIn } from '@services/user-api/user-api.typings';

import { error } from '@constants/errors';
import { REGEXPS } from '@constants/reg-exp';

export const logInValidationRules = {
  email: Yup.string().matches(REGEXPS.email, error('email').valid).required(error('email').required),
  password: Yup.string()
    .min(8, error(8).min)
    .matches(REGEXPS.password, error().password)
    .required(error('password').required),
};

export const logInValidationSchema = Yup.object(logInValidationRules);

export const logInInitialValues: IUserLogIn = { email: '', password: '' };

export const logInFieldNames = Object.keys(logInInitialValues) as (keyof IUserLogIn)[];
