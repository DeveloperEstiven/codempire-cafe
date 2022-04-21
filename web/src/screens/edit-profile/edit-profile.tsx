import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { EditProfileForm } from './edit-profile-form';
import { THandleEditProfileSubmit } from './edit-profile-form/edit-profile-form.typings';
import { StyledEditProfile as Styled } from './edit-profile.styles';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const onProfileSave: THandleEditProfileSubmit = (changedData, actions, img) => {
    const logo = img.split(';base64,')[1];
    const result = { ...changedData, logo }; //TODO to server
    actions.setSubmitting(false);
    navigate(ROUTES.profilePage);
  };

  return (
    <Styled.Page>
      <EditProfileForm onSave={onProfileSave} />
    </Styled.Page>
  );
};
