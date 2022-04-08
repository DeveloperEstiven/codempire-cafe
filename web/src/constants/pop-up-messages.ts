import Swal, { SweetAlertOptions } from 'sweetalert2';

import { TUserActionsNames } from '@services/user-api';
import { IError } from 'typings/api';

const errorMixin = (options: SweetAlertOptions) =>
  Swal.mixin({
    ...options,
    icon: 'error',
    title: options.title,
    showConfirmButton: true,
  });

const authMixin = (options: SweetAlertOptions) =>
  Swal.mixin({
    ...options,
    toast: true,
    showConfirmButton: false,
    position: 'top-end',
    icon: 'success',
    title: options.title,
    timer: 1500,
  });

const error = (m?: string) => ({
  400: errorMixin({ title: m || 'Bad Request' }),
  401: errorMixin({ title: m || 'Unauthorized' }),
  403: errorMixin({ title: m || 'Forbidden' }),
  404: errorMixin({ title: m || 'Not Found' }),
  409: errorMixin({ title: m || 'Already Exist' }),
});

const auth = {
  logIn: authMixin({ title: 'Successfully logged' }),
  signUp: authMixin({ title: 'Signed in successfully' }),
  logOut: authMixin({ title: 'Logout successful' }),
};

type TPopUpError = keyof ReturnType<typeof error>;

export const handleError = (e?: IError) => error(e?.message)[(e?.code as TPopUpError) || 400].fire();
export const handleSuccess = (type: TUserActionsNames) => auth[type].fire();
