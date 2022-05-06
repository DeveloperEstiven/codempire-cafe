import PhoneInput from 'react-phone-input-2';

import { Icon } from '@components/icon';
import { useInput } from './input.state';
import { StyledInput as Styled } from './input.styles';
import { IInputProps } from './input.typings';

export const Input: React.FC<IInputProps> = (props) => {
  const {
    type = 'text',
    name,
    value,
    onChange,
    title,
    placeholder,
    isPhoneNumber,
    isTextArea,
    isAutoFocus,
    onBlur,
    onKeyDown,
    isDisabled,
  } = props;
  const { isFocus, handleFocus, onPhoneChange, isPassword, toggleIsPassword } = useInput({
    type,
    handlePhoneChange: onChange,
  });

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onBlur && onBlur(event);
    handleFocus();
  };

  return (
    <>
      {title && <Styled.Title>{title}</Styled.Title>}
      <Styled.Wrapper>
        <Styled.Block>
          {isTextArea && (
            <Styled.TextArea
              disabled={isDisabled}
              value={value}
              onChange={onChange}
              name={name}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          )}
          {isPhoneNumber && (
            <PhoneInput
              disabled={isDisabled}
              inputProps={{
                name,
              }}
              specialLabel={''}
              countryCodeEditable={false}
              country={'ua'}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={onPhoneChange}
              value={value}
            />
          )}
          {!isTextArea && !isPhoneNumber && (
            <Styled.Input
              disabled={isDisabled}
              onKeyDown={onKeyDown}
              autoFocus={isAutoFocus}
              onBlur={handleBlur}
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
