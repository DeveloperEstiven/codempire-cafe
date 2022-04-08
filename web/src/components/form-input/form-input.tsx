import { Input } from '@components/input';

import { IFormInputProps } from './form-input.typings';

import { StyledField as Styled } from './form-input.styles';

export const FormInput: React.FC<IFormInputProps> = ({ field, ...props }) => {
  const isError = field.touched && field.errorMessage;
  return (
    <Styled.Field>
      <Input {...props} />
      {isError && <Styled.Error>{field.errorMessage}</Styled.Error>}
    </Styled.Field>
  );
};
