import { components, DropdownIndicatorProps, GroupBase, OptionProps } from 'react-select';

import { Icon } from '@components/icon';
import { IDropdownData } from './dropdown.typings';

const { Option, DropdownIndicator } = components;

export const IconIndicator:
  | React.ComponentType<DropdownIndicatorProps<string | IDropdownData, boolean, GroupBase<IDropdownData>>>
  | null
  | undefined = (props) => {
  return (
    <DropdownIndicator {...props}>
      <Icon type="sorting" />
    </DropdownIndicator>
  );
};

export const IconOption = (props: OptionProps<IDropdownData | string, boolean, GroupBase<IDropdownData>>) => {
  const data = props.data as IDropdownData;

  return (
    <Option {...props}>
      {data.icon && <Icon type={data.icon} />}
      {data.label}
    </Option>
  );
};
