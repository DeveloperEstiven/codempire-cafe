import { TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import './date-picker-field.styles.css';
import { IDatePickerFieldProps } from './date-picker-field.typings';

export const DatePickerField: React.FC<IDatePickerFieldProps> = ({
  name,
  value,
  onChange,
  maxDate,
  classesCalendar,
  classesTextField,
}) => {
  return (
    <MobileDatePicker
      value={value}
      inputFormat="dd/MM/yyyy"
      disablePast
      showToolbar={false}
      onChange={(val) => {
        onChange(name, val);
      }}
      DialogProps={{
        classes: classesCalendar,
      }}
      maxDate={maxDate}
      renderInput={(props) => <TextField classes={classesTextField} variant="outlined" {...props} />}
    />
  );
};
