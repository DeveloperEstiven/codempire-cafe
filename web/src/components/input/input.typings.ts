import { TInputEvent } from 'typings/api';

export type TInputType = 'text' | 'password';

export interface IInputProps {
  type?: TInputType;
  name?: string;
  isDisabled?: boolean;
  isPhoneNumber?: boolean;
  isTextArea?: boolean;
  isAutoFocus?: boolean;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: (e: TInputEvent) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  suffix?: string;
  title?: string;
  isMasked?: boolean;
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
