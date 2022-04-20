import { SetStateAction } from 'react';
import { StylesConfig } from 'react-select';

import { TIcon } from '@components/icon';
import { ISort } from 'typings/api';

export interface IDropdownSelected {
  selected?: TDropdownData | ISort;
  setSelected: React.Dispatch<SetStateAction<TDropdownData | ISort>>;
}

export interface IDropdownProps extends IDropdownSelected {
  items: IDropdownData[] | ISort[];
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  stylesConfig?: StylesConfig<IDropdownData, boolean>;
}

export interface IDropdownData {
  value: string;
  label: string;
  icon?: TIcon;
}

export type TDropdownData = IDropdownData[] | ISort | IDropdownData | '';
