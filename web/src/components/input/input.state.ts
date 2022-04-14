import { useState } from 'react';

import { TInputEvent } from 'typings/api';

import { IUseInputProps } from './input.typings';

export const useInput = (props: IUseInputProps) => {
  const [isPassword, setIsPassword] = useState(props.type === 'password');
  const [isFocus, setIsFocus] = useState(false);

  const [value, setValue] = useState('');

  const toggleIsPassword = () => setIsPassword((visible) => !visible);
  const handleFocus = () => setIsFocus((focused) => !focused);
  const onChange = (e: TInputEvent) => setValue(e.target.value);

  const onPhoneChange = (_: string, __: {}, e: TInputEvent) => {
    props.handlePhoneChange(e);
  };

  return {
    value,
    onChange,
    onPhoneChange,
    isPassword,
    isFocus,
    toggleIsPassword,
    handleFocus,
  };
};
