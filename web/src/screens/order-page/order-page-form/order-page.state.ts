import { FormikHelpers, useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
    commentReceived, selectedAddressReceived, selectedDateReceived, selectedRadioReceived,
    selectedTimeReceived
} from '@store/reducers/order';
import { ITime, TInputEvent, TRadioValues } from 'typings/api';
import { OrderValidationSchema } from './order-page-form.constants';
import { useStylesTextField } from './order-page-form.styles';
import { IOrderForm, IOrderFormProps } from './order-page-form.typings';

export const useOrderPage = ({ onOrder }: IOrderFormProps) => {
  const {
    selectedRadio: defaultSelected,
    selectedTime: defaultTime,
    selectedDate: defaultDate,
    selectedAddress: defaultAddress,
    comment: defaultComment,
  } = useAppSelector((store) => store.order);

  const { addresses } = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<ITime>(defaultTime);
  const classesTextField = useStylesTextField();
  const [selectedRadio, setSelectedRadio] = useState<TRadioValues>(defaultSelected);

  const getAddress = (address: string): IDropdownData => {
    const receivedAddress = addresses?.find((addr) => addr?.address === address);
    return receivedAddress ? { value: receivedAddress.address, label: receivedAddress.address } : ({} as IDropdownData);
  };

  const onSubmit = (values: IOrderForm, formikHelpers: FormikHelpers<IOrderForm>) => {
    const deliveryDate =
      selectedRadio === 'now'
        ? new Date()
        : new Date(new Date(values.deliveryDate).setHours(+time.hours, +time.minutes, 0));
    const address = addresses.find((addr) => addr?.address === values.address.value)!;
    onOrder({ ...values, deliveryDate, address }, formikHelpers);
  };

  const getActiveAddresses = (): IDropdownData[] | undefined => {
    const activeAddresses = addresses?.filter(({ isActive }) => isActive);
    return activeAddresses?.map(({ address }) => ({ value: address, label: address }));
  };

  const activeAddress = getActiveAddresses();

  const { handleSubmit, setFieldValue, values, errors, touched, isValid, handleBlur, validateForm, handleChange } =
    useFormik<IOrderForm>({
      initialValues: {
        comment: defaultComment,
        address: getAddress(defaultAddress || (activeAddress && activeAddress[0]?.value) || ''),
        deliveryDate: defaultDate,
      },
      validationSchema: OrderValidationSchema,
      onSubmit,
    });

  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const onTimeChange = (newTime: ITime) => {
    dispatch(selectedTimeReceived(newTime));
    setTime(newTime);
  };

  const isRadioSelected = (value: string) => selectedRadio === value;

  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TRadioValues;
    setSelectedRadio(value);
    dispatch(selectedRadioReceived(value));
  };

  const onDateChange = (date: Date | null) => {
    setFieldValue('deliveryDate', date);
    date && dispatch(selectedDateReceived(date));
  };

  const onAddressChange = (option: IDropdownData) => {
    setFieldValue('address', option);
    dispatch(selectedAddressReceived(option.value));
  };

  const onCommentChange = (e: TInputEvent) => {
    handleChange(e);
    dispatch(commentReceived(e.target.value));
  };

  useEffect(() => {
    (() => validateForm())();
  }, []);

  return {
    classesTextField,
    time,
    errors,
    touched,
    isValid,
    maxDate,
    addresses,
    selectedRadio,
    values,
    getActiveAddresses,
    onTimeChange,
    handleSubmit,
    handleBlur,
    isRadioSelected,
    handleRadioCheck,
    onCommentChange,
    onDateChange,
    onAddressChange,
  };
};
