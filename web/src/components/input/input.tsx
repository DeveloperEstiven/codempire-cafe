import PhoneInput from 'react-phone-input-2';

import { Icon } from '@components/icon';

import { useInput } from './input.state';

import { IInputProps } from './input.typings';

import { StyledInput as Styled } from './input.styles';

export const Input: React.FC<IInputProps> = (props) => {
  const { type = 'text', name, value, onChange, title, placeholder, isPhoneNumber, isTextArea } = props;
  const { isFocus, handleFocus, onPhoneChange, isPassword, toggleIsPassword } = useInput({
    type,
    handlePhoneChange: onChange,
  });

  return (
    <>
      {title && <Styled.Title>{title}</Styled.Title>}
      <Styled.Wrapper>
        <Styled.Block>
          {isTextArea && <Styled.TextArea onBlur={handleFocus} onFocus={handleFocus} />}
          {isPhoneNumber && (
            <PhoneInput
              inputProps={{
                name,
              }}
              specialLabel={''}
              countryCodeEditable={false}
              country={'ua'}
              onBlur={handleFocus}
              onFocus={handleFocus}
              onChange={onPhoneChange}
              value={value}
            />
          )}
          {!isTextArea && !isPhoneNumber && (
            <Styled.Input
              onBlur={handleFocus}
              onFocus={handleFocus}
              name={name}
              value={value}
              type={isPassword ? 'password' : 'text'}
              onChange={onChange}
            />
          )}
        </Styled.Block>

        <Styled.Label htmlFor={name} $isTitle={!!title} $isFocus={isFocus} $isValue={!!value}>
          <span>{isPhoneNumber ? 'Phone number' : placeholder}</span>
        </Styled.Label>

        {type === 'password' && (
          <Styled.Icon onClick={toggleIsPassword}>
            <Icon type={isPassword ? 'visibility' : 'visibilityOff'} />
          </Styled.Icon>
        )}
      </Styled.Wrapper>
    </>
  );
};
