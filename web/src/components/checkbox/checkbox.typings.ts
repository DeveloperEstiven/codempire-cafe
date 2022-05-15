import { TInputEvent } from 'typings/api';

export interface ICheckboxProps {
  id: string;
  value: string;
  checkHandler?: (event: TInputEvent) => void;
  isChecked: boolean;
  isReadOnly?: boolean;
}
