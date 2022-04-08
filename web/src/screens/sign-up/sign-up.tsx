import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@components/logo';
import { SignUpForm } from './sign-up-form';

import { useSignUpMutation } from '@services/user-api';

import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';

import { THandleSignUpSubmit } from './sign-up-form/sign-up-form.typings';

export const SignUpPage: React.FC = () => {
  const [signUpUser] = useSignUpMutation();
  const navigate = useNavigate();

  const onSignUp: THandleSignUpSubmit = async (userData, actions) => {
    await trackPromise(signUpUser(userData).unwrap(), PROMISES_AREA.signUp);
    navigate(ROUTES.mainPage);
    actions.setSubmitting(false);
  };

  return (
    <>
      <Logo />
      <SignUpForm onSignUp={onSignUp} />
    </>
  );
};
