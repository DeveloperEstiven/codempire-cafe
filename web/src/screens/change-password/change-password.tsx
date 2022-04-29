import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useChangePasswordMutation } from '@services/profile-page-api/profile-page-api';
import { IResponseError } from 'typings/api';
import { ChangePasswordForm } from './change-password-form';
import { TChangePasswordCb } from './change-password-form/change-password-form.typings';

export const ChangePassword: React.FC = () => {
  const [changePassword, { error }] = useChangePasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  const onSave: TChangePasswordCb = async (values) => {
    await trackPromise(changePassword(values).unwrap(), PROMISES_AREA.changePassword);
    successMixin({ title: 'Password changed successfully' }).fire();
    navigate(ROUTES.profilePage);
  };

  return <ChangePasswordForm onSave={onSave} />;
};
