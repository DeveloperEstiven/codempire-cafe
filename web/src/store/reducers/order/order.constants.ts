import { IOrderInitialState } from './order.typings';

export const orderInitialState: IOrderInitialState = {
  selectedRadio: 'now',
  selectedTime: {
    hours: new Date().getHours().toString(),
    minutes: '00',
  },
  selectedDate: new Date(),
  selectedAddress: '',
  comment: '',
};
