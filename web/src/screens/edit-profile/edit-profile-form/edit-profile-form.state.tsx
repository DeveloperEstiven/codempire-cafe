import { useFormik } from 'formik';
import { useState } from 'react';

import { useAppSelector } from '@hooks/redux';
import { editProfileValidationSchema } from './edit-profile-form.constants';
import { TEditProfile, THandleEditProfileSubmit } from './edit-profile-form.typings';

export const useEditProfileForm = (onSave: THandleEditProfileSubmit) => {
  const { userName, phoneNumber, email, logo } = useAppSelector((store) => store.user.user);
  const [img, setImg] = useState(logo);
  const [isChangeImageOpen, setIsChangeImageOpen] = useState(false);

  const editProfileInitialValues: TEditProfile = {
    userName,
    phoneNumber,
    email,
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<TEditProfile>({
    initialValues: editProfileInitialValues,
    validationSchema: editProfileValidationSchema,
    onSubmit: (values, actions) => onSave(values, actions, img),
  });

  const onChangeImageClose = () => setIsChangeImageOpen(false);
  const onChangeLogo = () => setIsChangeImageOpen(true);

  const editProfileFieldNames = Object.keys(editProfileInitialValues) as (keyof TEditProfile)[];

  return {
    img,
    editProfileFieldNames,
    onChangeLogo,
    handleSubmit,
    handleChange,
    setImg,
    onChangeImageClose,
    isChangeImageOpen,
    values,
    errors,
    touched,
  };
};
