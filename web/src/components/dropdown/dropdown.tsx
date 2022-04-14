import { FC, SetStateAction } from 'react';
import Select, { components, DropdownIndicatorProps, MultiValue, SingleValue } from 'react-select';

import { Chip } from '@components/chip';
import { Icon } from '@components/icon';

import { IDropdownData, IDropdownProps, TDropdownData } from './dropdown.typings';

import { dropdownStyles, dropdownTheme, StyledDropdown as Styled } from './dropdown.styles';

export const Dropdown: FC<IDropdownProps> = (props) => {
  const { isMulti, items, placeholder, selected, setSelected, isSearchable, stylesConfig: stylesObject } = props;

  const handleChange = (newValue: MultiValue<IDropdownData> | SingleValue<IDropdownData>) => {
    setSelected(newValue as SetStateAction<TDropdownData>);
  };

  return (
    <Styled.Wrapper>
      {isMulti && (
        <Styled.Chips>
          {Array.isArray(selected) &&
            selected.map((el) => (
              <Chip key={el.value} selected={selected} setSelected={setSelected} value={el.value} label={el.label} />
            ))}
        </Styled.Chips>
      )}

      <Select
        options={items}
        onChange={handleChange}
        value={selected || undefined}
        styles={stylesObject || dropdownStyles(isMulti)}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        theme={dropdownTheme}
        placeholder={placeholder}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isSearchable={isSearchable}
        isClearable={false}
        isMulti={isMulti}
      />
    </Styled.Wrapper>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<IDropdownData, boolean>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon type="sorting" />
    </components.DropdownIndicator>
  );
};
