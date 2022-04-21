import { FormikHelpers } from 'formik';

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  approvedPassword: string;
}

export type THandleChangePasswordSubmit = (values: IChangePassword, actions: FormikHelpers<IChangePassword>) => void;

export interface IChangePasswordFormProps {
  onSave: THandleChangePasswordSubmit;
}
