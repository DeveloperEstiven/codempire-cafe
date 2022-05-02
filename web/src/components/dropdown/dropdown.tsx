import { FC } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

import { Chip } from '@components/chip';
import { IconIndicator, IconOption } from '@components/dropdown/dropdown.constants';
import { ISort } from 'typings/api';
import { dropdownStyles, dropdownTheme, StyledDropdown as Styled } from './dropdown.styles';
import { IDropdownData, IDropdownProps } from './dropdown.typings';

export const Dropdown: FC<IDropdownProps> = (props) => {
  const {
    name,
    onBlur,
    isMulti,
    items,
    placeholder,
    selected,
    setSelected,
    isSearchable,
    stylesConfig: stylesObject,
  } = props;

  const handleChange = (
    newValue: MultiValue<IDropdownData | ISort | string> | SingleValue<IDropdownData | ISort | string>
  ) => {
    setSelected(newValue);
  };

  const getValue = () => {
    if (typeof selected === 'string' || selected instanceof String) {
      return items.find((items) => items.value === selected) || '';
    }
    return selected;
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
        name={name}
        onBlur={onBlur}
        options={items as ISort[]}
        onChange={handleChange}
        value={getValue()}
        styles={stylesObject || dropdownStyles(isMulti)}
        components={{
          Option: IconOption,
          DropdownIndicator: IconIndicator,
          IndicatorSeparator: () => null,
        }}
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
