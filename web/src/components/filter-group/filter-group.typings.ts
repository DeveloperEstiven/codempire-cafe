import { TInputEvent } from 'typings/api';

export interface IFilterGroupProps {
  name: string;
  data: string[];
  handleCheck: (e: TInputEvent) => void;
  checkedState: string[];
}
