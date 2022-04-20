import { FC, SetStateAction } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

import { Chip } from '@components/chip';
import { ISort } from 'typings/api';
import { IconIndicator, IconOption } from './dropdown.constants';
import { dropdownStyles, dropdownTheme, StyledDropdown as Styled } from './dropdown.styles';
import { IDropdownData, IDropdownProps, TDropdownData } from './dropdown.typings';

export const Dropdown: FC<IDropdownProps> = (props) => {
  const { isMulti, items, placeholder, selected, setSelected, isSearchable, stylesConfig: stylesObject } = props;

  const handleChange = (newValue: MultiValue<IDropdownData | ISort> | SingleValue<IDropdownData | ISort>) => {
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
        options={items as ISort[]}
        onChange={handleChange}
        value={selected as ISort}
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
