import { components, DropdownIndicatorProps, GroupBase, OptionProps } from 'react-select';

import { Icon } from '@components/icon';
import { IDropdownData } from './dropdown.typings';

const { Option, DropdownIndicator } = components;

export const IconIndicator = (props: DropdownIndicatorProps<IDropdownData, boolean>) => {
  return (
    <DropdownIndicator {...props}>
      <Icon type="sorting" />
    </DropdownIndicator>
  );
};

export const IconOption = (props: OptionProps<IDropdownData, boolean, GroupBase<IDropdownData>>) => {
  return (
    <Option {...props}>
      {props.data.icon && <Icon type={props.data.icon} />}
      {props.data.label}
    </Option>
  );
};
