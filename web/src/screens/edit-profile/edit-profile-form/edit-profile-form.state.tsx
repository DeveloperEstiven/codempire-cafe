import imageCompression from 'browser-image-compression';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { useAppSelector } from '@hooks/redux';
import { convertBase64 } from '@utils/convertBase64';
import {
    compressionConfig, editProfileValidationSchema, imgTypes
} from './edit-profile-form.constants';
import { TEditProfile, THandleEditProfileSubmit } from './edit-profile-form.typings';

const swal = withReactContent(Swal);

export const useEditProfileForm = (onSave: THandleEditProfileSubmit) => {
  const { userName, phoneNumber, email, logo } = useAppSelector((store) => store.user.user);
  const [img, setImg] = useState(logo);

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

  const handleChangeImage = async (file: File) => {
    const compressedFile = await imageCompression(file, compressionConfig);
    const base64 = (await convertBase64(compressedFile)) as string;
    setImg(base64);
    swal.close();
    successMixin({ title: 'Changed successfully' }).fire();
  };

  const handleChangeImageError = () => {
    errorMixin({ title: `File type error! Must be ${imgTypes.join('/')}`, toast: true }).fire();
  };

  const onChangeLogo = () => {
    swal.fire({
      html: (
        <FileUploader
          handleChange={handleChangeImage}
          multiple={false}
          name="logo"
          classes="upload"
          label="Upload image"
          types={imgTypes}
          onTypeError={handleChangeImageError}
        />
      ),
      customClass: {
        popup: 'upload-container',
      },
      showConfirmButton: false,
    });
  };

  useEffect(() => () => swal.close(), []);

  const editProfileFieldNames = Object.keys(editProfileInitialValues) as (keyof TEditProfile)[];

  return {
    img,
    editProfileFieldNames,
    onChangeLogo,
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
  };
};
