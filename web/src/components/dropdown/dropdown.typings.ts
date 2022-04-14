import { SetStateAction } from 'react';
import { StylesConfig } from 'react-select';

export interface IDropdownSelected {
  selected: TDropdownData;
  setSelected: React.Dispatch<SetStateAction<TDropdownData>>;
}

export interface IDropdownProps extends IDropdownSelected {
  items: IDropdownData[];
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  stylesConfig?: StylesConfig<IDropdownData, boolean>;
}

export interface IDropdownData {
  value: string;
  label: string;
}

export type TDropdownData = IDropdownData[] | IDropdownData | '';
