import { FormikHelpers } from 'formik';

import { IUserSignUp } from '@services/user-api/user-api.typings';

export type THandleSignUpSubmit = (values: IUserSignUp, actions: FormikHelpers<IUserSignUp>) => void;

export interface SignUpFormProps {
  onSignUp: THandleSignUpSubmit;
}
