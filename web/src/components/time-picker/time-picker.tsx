import { useTimePickerState } from './time-picker.state';
import { StyledTimePicker as Styled } from './time-picker.styles';
import { ITimePickerProps } from './time-picker.typings';

export const TimePicker: React.FC<ITimePickerProps> = ({ time, setTime }) => {
  const {
    onIncrement,
    onDecrement,
    time: { hours, minutes },
  } = useTimePickerState({ time, setTime });

  return (
    <Styled.TimePicker>
      <button onClick={onDecrement} type="button" />
      <span>
        {hours}:{minutes}
      </span>
      <button onClick={onIncrement} type="button" />
    </Styled.TimePicker>
  );
};
