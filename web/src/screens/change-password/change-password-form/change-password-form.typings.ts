import { FormikHelpers } from 'formik';

import { IChangePassword } from 'typings/api';

export interface IChangePasswordForm extends IChangePassword {
  approvedPassword: string;
}

export type TChangePasswordCb = (values: IChangePassword) => void;

export type THandleChangePasswordSubmit = (
  values: IChangePasswordForm,
  actions: FormikHelpers<IChangePasswordForm>
) => void;

export interface IChangePasswordFormProps {
  onSave: TChangePasswordCb;
}
