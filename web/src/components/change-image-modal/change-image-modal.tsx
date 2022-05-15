import imageCompression from 'browser-image-compression';
import { FileUploader } from 'react-drag-drop-files';

import { compressionConfig, imgTypes } from '@constants/images';
import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { Modal } from '@mui/material';
import { convertBase64 } from '@utils/convertBase64';
import { StyledChangeImageModal as Styled } from './change-image-modal.styles';
import { IChangeImageModalProps } from './change-image-modal.typings';

export const ChangeImageModal: React.FC<IChangeImageModalProps> = ({ isOpen, close, name, handleChange }) => {
  const handleChangeImage = async (file: File) => {
    const compressedFile = await imageCompression(file, compressionConfig);
    const base64 = (await convertBase64(compressedFile)) as string;
    handleChange(base64);
    close();
    successMixin({ title: 'Changed successfully' }).fire();
  };

  const handleChangeImageError = () => {
    errorMixin({ title: `File type error! Must be ${imgTypes.join('/')}`, toast: true }).fire();
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <Styled.Wrapper>
        <FileUploader
          handleChange={handleChangeImage}
          multiple={false}
          name={name}
          classes="upload"
          label="Upload image"
          types={imgTypes}
          onTypeError={handleChangeImageError}
        />
      </Styled.Wrapper>
    </Modal>
  );
};
