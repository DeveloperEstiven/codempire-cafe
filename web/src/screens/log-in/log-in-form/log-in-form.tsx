import { useFormik } from 'formik';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { FormInput } from '@components/form-input';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { IUserLogIn } from '@services/user-api/user-api.typings';
import { Button } from '@styles/components/button';
import { Form, FormButtonsWrapper, FormLinks } from '@styles/components/form';
import { Space } from '@styles/components/space';
import { capitalize } from '@utils/capitalize';
import {
    logInFieldNames, logInInitialValues, logInValidationSchema
} from './log-in-form.constants';
import { ILogInFormProps } from './log-in-form.typings';

export const LogInForm: React.FC<ILogInFormProps> = ({ onLogIn }) => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, errors, touched, isValid, handleBlur, validateForm } =
    useFormik<IUserLogIn>({
      initialValues: logInInitialValues,
      validationSchema: logInValidationSchema,
      onSubmit: onLogIn,
    });

  useEffect(() => {
    (() => validateForm())();
  }, []);

  const onSkip = () => navigate(ROUTES.mainPage);

  return (
    <Form onSubmit={handleSubmit}>
      <Space direction="vertical" gapSize={22}>
        {logInFieldNames.map((name) => (
          <FormInput
            key={name}
            value={values[name]}
            onBlur={handleBlur}
            onChange={handleChange}
            field={{ touched: touched[name], errorMessage: errors[name] }}
            name={name}
            placeholder={capitalize(name)}
            type={name === 'password' ? 'password' : 'text'}
          />
        ))}
      </Space>

      <FormLinks>
        <NavLink to={ROUTES.forgot}>Forgot password?</NavLink>
        <NavLink to={ROUTES.signUp}>Sign up</NavLink>
      </FormLinks>

      <FormButtonsWrapper>
        <Loader area={PROMISES_AREA.logIn}>
          <Button color="black" type="submit" disabled={!isValid}>
            next
          </Button>
        </Loader>
        <Button type="button" onClick={onSkip}>
          skip
        </Button>
      </FormButtonsWrapper>
    </Form>
  );
};
