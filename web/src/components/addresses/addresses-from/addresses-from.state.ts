import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation, useNavigate } from 'react-router-dom';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { useAddAddressesMutation } from '@services/profile-page-api';
import { IAddAddress, IResponseError, TInputEvent } from 'typings/api';
import { LocationState } from './addresses-form.typings';

export const useAddressesForm = () => {
  const { addresses: userAddresses, role } = useAppSelector((store) => store.user.user);
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState<IAddAddress[]>(userAddresses || []);
  const [addAddresses, { error }] = useAddAddressesMutation();
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const [isExists, setIsExists] = useState(false);

  useEffect(() => {
    if (isExists) {
      errorMixin({ title: 'This address already exists' }).fire();
      setIsExists(false);
    }
  }, [isExists]);
  const isManager = role === 'manager';

  useEffect(() => {
    isManager && navigate(ROUTES.mainPage);
  }, []);

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
    if (e.key === 'Enter' && value) {
      const newAddress = { address: value, isActive: true };
      const isAddressExist = addresses.find((address) => address.address === newAddress.address);
      if (isAddressExist) {
        return setIsExists(true);
      } else {
        setAddresses([...addresses, newAddress]);
        setValue('');
        setIsExists(false);
      }
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
    const { prevPath, prevState } = location.state;
    navigate(prevPath ? prevPath : ROUTES.profilePage, { state: prevState });
  };

  return { handleCheck, value, addresses, onChange, onAddNewAddress, onApply, isManager };
};
