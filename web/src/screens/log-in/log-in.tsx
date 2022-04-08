import { FC } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@components/logo';
import { LogInForm } from './log-in-form';

import { useLogInMutation } from '@services/user-api';

import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';

import { THandleLogInSubmit } from './log-in-form/log-in-form.typings';

export const LogInPage: FC = () => {
  const [logInUser] = useLogInMutation();
  const navigate = useNavigate();

  const onLogIn: THandleLogInSubmit = async (userData, actions) => {
    await trackPromise(logInUser(userData).unwrap(), PROMISES_AREA.logIn);
    navigate(ROUTES.mainPage);
    actions.setSubmitting(false);
  };

  return (
    <>
      <Logo />
      <LogInForm onLogIn={onLogIn} />
    </>
  );
};
