import { IInputProps } from '@components/input/input.typings';

export interface IFormInputProps extends IInputProps {
  field: {
    touched?: boolean;
    errorMessage?: string;
  };
}
