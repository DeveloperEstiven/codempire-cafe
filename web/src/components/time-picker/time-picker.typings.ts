import { ITime } from 'typings/api';

export interface ITimePickerProps {
  time: ITime;
  setTime: (time: ITime) => void;
}
