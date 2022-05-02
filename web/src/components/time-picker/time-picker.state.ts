import { ITimePickerProps } from './time-picker.typings';

export const useTimePickerState = ({ time, setTime }: Omit<ITimePickerProps, 'name' | 'onBlur'>) => {
  const onIncrement = () => {
    if (+time.hours === 23 && +time.minutes === 30) {
      return setTime({ hours: '00', minutes: '00' });
    }
    if (+time.minutes >= 30) {
      return setTime({
        hours: +time.hours < 9 ? '0' + (+time.hours + 1) : (+time.hours + 1).toString(),
        minutes: '00',
      });
    }
    setTime({ ...time, minutes: '30' });
  };

  const onDecrement = () => {
    if (+time.hours === 0 && +time.minutes === 0) {
      return setTime({ hours: '23', minutes: '30' });
    }
    if (+time.minutes === 0) {
      return setTime({
        hours: +time.hours < 9 ? '0' + (+time.hours - 1) : (+time.hours - 1).toString(),
        minutes: '30',
      });
    }
    setTime({ ...time, minutes: '00' });
  };

  return {
    onIncrement,
    onDecrement,
    time,
  };
};
