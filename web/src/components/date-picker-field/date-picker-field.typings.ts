import { FormikErrors } from 'formik';

import { ClassNameMap } from '@material-ui/styles';

export interface IDatePickerFieldProps {
  value: Date;
  onChange: (field: string, value: Date | null) => Promise<void> | Promise<FormikErrors<any>>;
  name: string;
  maxDate?: Date;
  classesCalendar?: ClassNameMap<'root'>;
  classesTextField?: ClassNameMap<'root'>;
}
