import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FormInput } from '@components/form-input';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { Button } from '@styles/components/button';
import { FormLinks } from '@styles/components/form';
import { Space } from '@styles/components/space';
import {
    changePasswordInitialValues, changePasswordValidationSchema
} from './change-password-form.constants';
import { StyledChangePasswordForm as Styled } from './change-password-form.styles';
import {
    IChangePassword, IChangePasswordFormProps, THandleChangePasswordSubmit
} from './change-password-form.typings';

export const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({ onSave }) => {
  const onSubmitClick: THandleChangePasswordSubmit = (values, actions) => {
    //TODO request to server
    actions.setSubmitting(false);
    return onSave(values, actions);
  };

  const { handleSubmit, values, handleChange, errors, touched, isValid, handleBlur, validateForm } =
    useFormik<IChangePassword>({
      initialValues: changePasswordInitialValues,
      validationSchema: changePasswordValidationSchema,
      onSubmit: onSubmitClick,
    });

  useEffect(() => {
    (() => validateForm())();
  }, []);

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Space direction="vertical" gapSize={22}>
        <FormInput
          isAutoFocus
          value={values.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          field={{ touched: touched.oldPassword, errorMessage: errors.oldPassword }}
          name={'oldPassword'}
          type="password"
          title="Input your old password"
        />

        <FormInput
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          field={{ touched: touched.newPassword, errorMessage: errors.newPassword }}
          name={'newPassword'}
          type="password"
          title="Make up a new password"
        />

        <FormInput
          value={values.approvedPassword}
          onChange={handleChange}
          field={{ touched: touched.approvedPassword, errorMessage: errors.approvedPassword }}
          name={'approvedPassword'}
          onBlur={handleBlur}
          type="password"
          title="Approve"
        />

        <FormLinks>
          <Link to={ROUTES.forgot}>Forgot password?</Link>
        </FormLinks>

        {/* TODO: PROMISES_AREA.changePassword  */}
        <Loader area={PROMISES_AREA.changePassword}>
          <Button color="black" type="submit" disabled={!isValid}>
            save
          </Button>
        </Loader>
      </Space>
    </Styled.Form>
  );
};
