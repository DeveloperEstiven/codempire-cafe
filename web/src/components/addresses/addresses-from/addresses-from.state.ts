import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { TInputEvent } from 'typings/api';

export const mockData = [
  '2118 Thornridge Cir. Syracuse, Connect...',
  '2118 Thornridge Cir. Syracuse, Connect 2...',
  '2118 Thornridge Cir. Syracuse, Connect 3...',
  '2118 Thornridge Cir. Syracuse, Connect 4...',
  '2118 Thornridge Cir. Syracuse, Connect 5...',
]; //FIXME

export const useAddressesForm = () => {
  const [checkedState, setCheckedState] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState(mockData);
  const navigate = useNavigate();

  const setChecked = (value: string) => {
    let newState;
    if (checkedState.includes(value)) {
      newState = checkedState.filter((title) => title !== value);
    } else {
      newState = [...checkedState, value];
    }
    return newState;
  };

  const handleCheck = (e: TInputEvent) => {
    const value = e.target.value;
    const newState = setChecked(value);
    setCheckedState(newState);
  };

  const onChange = (e: TInputEvent) => {
    setValue(e.target.value);
  };

  const onAddNewAddress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setAddresses([...addresses, value]);
      const checked = setChecked(value);
      setCheckedState(checked);
      setValue('');
    }
  };

  const onApply = () => {
    //TODO to server
    navigate(ROUTES.profilePage);
  };

  return { handleCheck, checkedState, value, addresses, onChange, onAddNewAddress, onApply };
};
