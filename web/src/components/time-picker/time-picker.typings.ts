

export interface ITimePickerProps {
  time: ITime;
  setTime: (time: ITime) => void;
}

export interface ITime {
  hours: string;
  minutes: string;
}
