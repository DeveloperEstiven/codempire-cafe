import * as Yup from 'yup';

import { signUpValidationRules } from '@screens/sign-up/sign-up-form/sign-up-form.constants';

export const imgTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];
const { password, ...editProfileValidationRules } = signUpValidationRules;

export const editProfileValidationSchema = Yup.object({ ...editProfileValidationRules });

export const compressionConfig = {
  maxSizeMB: 0.04,
  maxWidthOrHeight: 550,
  useWebWorker: true,
};
