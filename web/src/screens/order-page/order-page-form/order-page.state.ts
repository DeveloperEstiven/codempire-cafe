import { FormikHelpers, useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { ITime } from '@components/time-picker/time-picker.typings';
import { OrderInitialValues, OrderValidationSchema } from './order-page-form.constants';
import { useStylesTextField } from './order-page-form.styles';
import { IOrderForm, IOrderFormProps, TRadioValues } from './order-page-form.typings';

export const useOrderPage = ({ onOrder }: IOrderFormProps) => {
  const [time, setTime] = useState<ITime>({
    hours: new Date().getHours().toString(),
    minutes: '00',
  });
  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const classesTextField = useStylesTextField();
  const [selectedRadio, setSelectedRadio] = useState<TRadioValues>('now');

  const isRadioSelected = (value: string) => selectedRadio === value;
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedRadio(e.target.value as TRadioValues);

  const onSubmit = (values: IOrderForm, formikHelpers: FormikHelpers<IOrderForm>) => {
    const deliveryDate =
      selectedRadio === 'now' ? new Date() : new Date(values.deliveryDate.setHours(+time.hours, +time.minutes, 0));
    onOrder({ ...values, deliveryDate }, formikHelpers);
  };

  const { handleSubmit, setFieldValue, values, errors, touched, isValid, handleBlur, validateForm, getFieldProps } =
    useFormik<IOrderForm>({
      initialValues: OrderInitialValues,
      validationSchema: OrderValidationSchema,
      onSubmit,
    });

  useEffect(() => {
    (() => validateForm())();
  }, []);

  return {
    classesTextField,
    time,
    values,
    errors,
    touched,
    isValid,
    maxDate,
    selectedRadio,
    setTime,
    handleSubmit,
    setFieldValue,
    handleBlur,
    isRadioSelected,
    handleRadioCheck,
    getFieldProps,
  };
};
