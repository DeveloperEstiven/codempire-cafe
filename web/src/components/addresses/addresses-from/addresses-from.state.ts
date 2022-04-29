import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { useAddAddressesMutation } from '@services/profile-page-api';
import { IAddress, IResponseError, TInputEvent } from 'typings/api';

export const useAddressesForm = () => {
  const { addresses: userAddresses } = useAppSelector((store) => store.user.user);
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState<IAddress[]>(userAddresses);
  const [addAddresses, { error }] = useAddAddressesMutation();
  const navigate = useNavigate();

  const onChange = (e: TInputEvent) => {
    setValue(e.target.value);
  };

  const handleCheck = (e: TInputEvent) => {
    setAddresses((s) => [
      ...s.map((option) => {
        if (option.address === e.target.value) {
          return {
            ...option,
            isActive: !option.isActive,
          };
        }
        return option;
      }),
    ]);
  };

  const onAddNewAddress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newAddress = { address: value, isActive: true };
      setAddresses([...addresses, newAddress]);
      setValue('');
    }
  };

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  const onApply = async () => {
    await trackPromise(addAddresses({ addresses }).unwrap(), PROMISES_AREA.addAddresses);
    successMixin({ title: 'Addresses added successfully' }).fire();
    navigate(ROUTES.profilePage);
  };

  return { handleCheck, value, addresses, onChange, onAddNewAddress, onApply };
};
