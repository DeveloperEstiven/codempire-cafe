import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { useEditProfileMutation } from '@services/profile-page-api';
import { IEditProfile, IResponseError } from 'typings/api';
import { EditProfileForm } from './edit-profile-form';
import { THandleEditProfileSubmit } from './edit-profile-form/edit-profile-form.typings';
import { StyledEditProfile as Styled } from './edit-profile.styles';

export const EditProfile: React.FC = () => {
  const [editProfile, { error }] = useEditProfileMutation();

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  const onProfileSave: THandleEditProfileSubmit = async (changedData, actions, img) => {
    const logo = img?.split(';base64,')[1];
    const profile: IEditProfile = { ...changedData, logo };
    await trackPromise(editProfile(profile).unwrap(), PROMISES_AREA.editProfile);
    successMixin({ title: 'Profile saved successfully' }).fire();
    actions.setSubmitting(false);
  };

  return (
    <Styled.Page>
      <EditProfileForm onSave={onProfileSave} />
    </Styled.Page>
  );
};
