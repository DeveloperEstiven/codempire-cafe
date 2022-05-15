import * as Yup from 'yup';

import { signUpValidationRules } from '@screens/sign-up/sign-up-form/sign-up-form.constants';

const { password, ...editProfileValidationRules } = signUpValidationRules;

export const editProfileValidationSchema = Yup.object({ ...editProfileValidationRules });
