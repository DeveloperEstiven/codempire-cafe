import { ClassNameMap } from '@material-ui/styles';

export interface IDatePickerFieldProps {
  value: Date;
  onChange: (date: Date | null) => void;
  maxDate?: Date;
  classesCalendar?: ClassNameMap<'root'>;
  classesTextField?: ClassNameMap<'root'>;
}
