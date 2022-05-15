import { GroupBase, StylesConfig, Theme } from 'react-select';
import styled from 'styled-components';

import { theme } from '@styles/theme';
import { IDropdownData } from './dropdown.typings';

export const StyledDropdown = {
  Chips: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
  `,
  Wrapper: styled.div`
    width: 100%;
  `,
};

export const dropdownStyles = (
  isMulti?: boolean
): StylesConfig<string | IDropdownData, boolean, GroupBase<IDropdownData>> => ({
  menuList: (base) => ({
    ...base,
    padding: '0px',
  }),
  menu: (base) => ({
    ...base,
    marginTop: '4px',
    borderRadius: 0,
    boxShadow: theme.boxShadow,
  }),
  option: (base) => ({
    ...base,
    borderBottom: `1px solid #EDEDED`,
    padding: '16px 32px',
    letterSpacing: '0.15px',
    lineHeight: '24px',
    color: '#000',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000',
  }),
  control: (base, state) => {
    const borderStyle = isMulti ? (state.menuIsOpen ? '1px solid #000' : '1px solid #E0E0E0') : '0';
    //TODO manager can't go to http://localhost:3000/order-page
    return {
      ...base,
      border: borderStyle,
      boxShadow: isMulti ? 'none' : theme.boxShadow,
      lineHeight: '24px',
      paddingLeft: isMulti ? '8px' : '4px',
      '&:hover': {
        border: borderStyle,
      },
    };
  },

  dropdownIndicator: (base, state) => {
    const changes = {
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      padding: isMulti ? '25.5px 19px' : '21.5px 13px',
      span: {
        borderColor: state.selectProps.menuIsOpen && '#000 transparent transparent transparent',
      },
    };
    return Object.assign(base, changes);
  },
});

export const dropdownTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#EDEDED',
    primary50: '#EDEDED',
    primary: 'lightgray',
  },
});
