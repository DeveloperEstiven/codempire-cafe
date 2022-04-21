import { FormikHelpers } from 'formik';

import { IUserSignUp } from '@services/user-api/user-api.typings';

export type TEditProfile = Omit<IUserSignUp, 'password'>;

export type THandleEditProfileSubmit = (
  values: TEditProfile,
  actions: FormikHelpers<TEditProfile>,
  img: string
) => void;

export interface IEditProfileFormProps {
  onSave: THandleEditProfileSubmit;
}
