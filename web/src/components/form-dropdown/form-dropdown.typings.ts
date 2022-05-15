import { FormikErrors, FormikTouched } from 'formik';
import { FocusEvent } from 'react';

import { IDropdownData, IDropdownProps } from '@components/dropdown/dropdown.typings';

type TError = FormikErrors<any>;

export interface IFormDropdownProps extends Partial<IDropdownProps> {
  onBlur: {
    (e: FocusEvent<HTMLInputElement, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  setFieldValue: (field: string, value: IDropdownData[], shouldValidate?: boolean) => Promise<void> | Promise<TError>;
  setSelected?: (option: any) => void;
  field: {
    touched: FormikTouched<any>;
    errors: TError;
  };
  value: IDropdownData | IDropdownData[];
  items: IDropdownData[];
  title?: string;
  name: string;
  isWithTouched?: boolean;
}
