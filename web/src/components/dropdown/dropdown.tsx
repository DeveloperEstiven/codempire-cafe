import { FC, SetStateAction } from 'react';
import Select, { components, DropdownIndicatorProps, MultiValue, SingleValue } from 'react-select';

import { Chip } from '@components/chip';

import { IDropdownData, IDropdownProps, TDropdownData } from './dropdown.typings';

import { dropdownStyles, dropdownTheme, StyledDropdown as Styled } from './dropdown.styles';

export const Dropdown: FC<IDropdownProps> = ({ isMulti, items, placeholder, selected, setSelected }) => {
  const handleChange = (newValue: MultiValue<IDropdownData> | SingleValue<IDropdownData>) => {
    setSelected(newValue as SetStateAction<TDropdownData>);
  };

  return (
    <div>
      {isMulti && (
        <Styled.Chips>
          {Array.isArray(selected) &&
            selected.map((el) => (
              <Chip key={el.id} selected={selected} setSelected={setSelected} id={el.id} label={el.label} />
            ))}
        </Styled.Chips>
      )}

      <Select
        options={items}
        onChange={handleChange}
        value={selected}
        styles={dropdownStyles(isMulti)}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        theme={dropdownTheme}
        placeholder={placeholder}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isSearchable={true}
        isClearable={false}
        isMulti={isMulti}
      />
    </div>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<IDropdownData, boolean>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Styled.Icon />
    </components.DropdownIndicator>
  );
};
