import { SetStateAction } from 'react';

export interface IDropdownSelected {
  selected: TDropdownData;
  setSelected: React.Dispatch<SetStateAction<TDropdownData>>;
}

export interface IDropdownProps extends IDropdownSelected {
  items: IDropdownData[];
  placeholder?: string;
  isMulti?: boolean;
}

export interface IDropdownData {
  value: string;
  id: number;
  label: string;
}

export type TDropdownData = IDropdownData[] | IDropdownData;
