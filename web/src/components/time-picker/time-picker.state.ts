import { ITimePickerProps } from './time-picker.typings';

export const useTimePickerState = ({ time, setTime }: ITimePickerProps) => {
  const onIncrement = () => {
    let newTime = { ...time, minutes: '30' };
    if (+time.hours === 23 && +time.minutes === 30) {
      newTime = { hours: '00', minutes: '00' };
    } else if (+time.minutes >= 30) {
      newTime = {
        hours: +time.hours < 9 ? '0' + (+time.hours + 1) : (+time.hours + 1).toString(),
        minutes: '00',
      };
    }
    setTime(newTime);
  };

  const onDecrement = () => {
    let newTime = { ...time, minutes: '00' };
    if (+time.hours === 0 && +time.minutes === 0) {
      newTime = { hours: '23', minutes: '30' };
    } else if (+time.minutes === 0) {
      newTime = {
        hours: +time.hours < 9 ? '0' + (+time.hours - 1) : (+time.hours - 1).toString(),
        minutes: '30',
      };
    }
    setTime(newTime);
  };

  return {
    onIncrement,
    onDecrement,
    time,
  };
};
