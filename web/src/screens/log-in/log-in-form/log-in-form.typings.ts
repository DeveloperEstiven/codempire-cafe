import { FormikHelpers } from 'formik';

import { IUserLogIn } from '@services/user-api/user-api.typings';

export type THandleLogInSubmit = (values: IUserLogIn, actions: FormikHelpers<IUserLogIn>) => void;

export interface ILogInFormProps {
  onLogIn: THandleLogInSubmit;
}
