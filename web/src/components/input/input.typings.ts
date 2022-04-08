import { TInputEvent } from 'typings/api';

export type TInputType = 'text' | 'password';

export interface IInputProps {
  type?: TInputType;
  name: string;
  isPhoneNumber?: boolean;
  isTextArea?: boolean;
  placeholder?: string;
  onChange: (e: TInputEvent) => void;
  value: string;
  title?: string;
}
export interface IUseInputProps {
  type: TInputType;
  handlePhoneChange: (e: TInputEvent) => void;
}

export interface ILabelProps {
  readonly $isFocus: boolean;
  readonly $isValue: boolean;
  readonly $isTitle: boolean;
}
