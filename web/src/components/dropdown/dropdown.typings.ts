import { SetStateAction } from 'react';
import { GroupBase, StylesConfig } from 'react-select';

import { TIcon } from '@components/icon';
import { ISort } from 'typings/api';

export interface IDropdownSelected {
  selected?: TDropdownData | ISort | string;
  setSelected: (option: any) => any | React.Dispatch<SetStateAction<TDropdownData | ISort>>;
}

export interface IDropdownProps extends IDropdownSelected {
  maxMenuHeight?: number;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  items: IDropdownData[] | ISort[];
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  stylesConfig?: StylesConfig<string | IDropdownData, boolean, GroupBase<IDropdownData>>;
}

export interface IDropdownData {
  value: string;
  label: string;
  icon?: TIcon;
}

export type TDropdownData = IDropdownData[] | ISort | IDropdownData | '';
