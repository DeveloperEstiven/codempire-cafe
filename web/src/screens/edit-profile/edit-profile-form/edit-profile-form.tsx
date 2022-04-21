import { FormInput } from '@components/form-input';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { Button } from '@styles/components/button';
import { Form } from '@styles/components/form';
import { Space } from '@styles/components/space';
import { splitCapitalize } from '@utils/capitalize';
import './edit-profile-form.css';
import { useEditProfileForm } from './edit-profile-form.state';
import { Logo } from './edit-profile-form.styles';
import { IEditProfileFormProps } from './edit-profile-form.typings';

export const EditProfileForm: React.FC<IEditProfileFormProps> = ({ onSave }) => {
  const { img, editProfileFieldNames, onChangeLogo, handleSubmit, handleChange, values, errors, touched } =
    useEditProfileForm(onSave);

  return (
    <Form onSubmit={handleSubmit}>
      <Logo onClick={onChangeLogo}>
        <img src={img} alt="User Logo" />
      </Logo>

      <Space direction="vertical" gapSize={22}>
        {editProfileFieldNames.map((name, i) => (
          <FormInput
            key={name}
            isAutoFocus={!i}
            value={values[name]}
            onChange={handleChange}
            field={{ touched: touched[name], errorMessage: errors[name] }}
            name={name}
            isPhoneNumber={name === 'phoneNumber'}
            title={splitCapitalize(name)}
          />
        ))}

        {/* TODO: PROMISES_AREA.editProfile  */}
        <Loader area={PROMISES_AREA.editProfile}>
          <Button color="black" type="submit">
            save
          </Button>
        </Loader>
      </Space>
    </Form>
  );
};
