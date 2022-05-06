import { ITime, TRadioValues } from 'typings/api';

export interface IOrderInitialState {
  selectedRadio: TRadioValues;
  selectedTime: ITime;
  selectedDate: Date;
  selectedAddress: string;
  comment: string;
}
