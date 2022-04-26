import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { FormInput } from '@components/form-input';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { IUserSignUp } from '@services/user-api/user-api.typings';
import { Button } from '@styles/components/button';
import { Form, FormButtonsWrapper, FormLinks } from '@styles/components/form';
import { Space } from '@styles/components/space';
import { splitCapitalize } from '@utils/capitalize';
import {
    signUpFieldNames, signUpInitialValues, signUpValidationSchema
} from './sign-up-form.constants';
import { SignUpFormProps } from './sign-up-form.typings';

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<IUserSignUp>({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: onSignUp,
  });

  const onSkip = () => navigate(ROUTES.mainPage);

  return (
    <Form onSubmit={handleSubmit}>
      <Space direction="vertical" gapSize={22}>
        {signUpFieldNames.map((name) => (
          <FormInput
            key={name}
            value={values[name]}
            onChange={handleChange}
            field={{ touched: touched[name], errorMessage: errors[name] }}
            name={name}
            isPhoneNumber={name === 'phoneNumber'}
            placeholder={splitCapitalize(name)}
            type={name === 'password' ? 'password' : 'text'}
          />
        ))}
      </Space>

      <FormLinks>
        <NavLink to={ROUTES.logIn}>log in</NavLink>
      </FormLinks>

      <FormButtonsWrapper>
        <Loader area={PROMISES_AREA.signUp}>
          <Button color="black" type="submit">
            create
          </Button>
        </Loader>
        <Button type="button" onClick={onSkip}>
          skip
        </Button>
      </FormButtonsWrapper>
    </Form>
  );
};
