import { useAppSelector } from '@hooks/redux';
import { ChangePasswordForm } from './change-password-form';
import { THandleChangePasswordSubmit } from './change-password-form/change-password-form.typings';

export const ChangePassword: React.FC = () => {
  const {
    user: { id },
  } = useAppSelector((store) => store.user);

  const onSave: THandleChangePasswordSubmit = (values) => {
    console.log(id, values); //TODO to server
  };

  return <ChangePasswordForm onSave={onSave} />;
};
