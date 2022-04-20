import { GroupBase, StylesConfig } from 'react-select';
import styled from 'styled-components';

import { IDropdownData } from '@components/dropdown/dropdown.typings';

export const StyledDataOrganizer = {
  FilterWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    gap: 20px;
    height: 50px;
    color: ${(props) => props.theme.colors.textPrimary};
  `,

  FilterItem: styled.div<{ isFilterApplied?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    text-transform: uppercase;
    padding: 5px 10px;
    height: 36px;
    position: relative;
    cursor: pointer;
    div {
      white-space: nowrap;
      transition: ${(props) => props.theme.transition};
      color: ${(props) => props.theme.colors.textPrimary};
    }
    svg {
      margin: 0 20px 0 0;
      fill: ${(props) => props.theme.colors.textPrimary};
      transition: fill ${(props) => props.theme.transition} ease 0s;
    }

    span {
      &::before {
        content: '';
        position: absolute;
        right: 5px;
        top: 8px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        display: block;
        display: ${(props) => (props.isFilterApplied ? 'block' : 'none')};
        background-color: ${(props) => props.theme.colors.textPrimary};
      }
    }

    transition: color ${(props) => props.theme.transition} ease 0s;
    &:hover {
      color: #000;
      svg {
        fill: #000;
      }
      div {
        color: #000;
      }
    }
  `,
};

export const sortingStyles: StylesConfig<IDropdownData, boolean, GroupBase<IDropdownData>> = {
  control: (base) => {
    return {
      ...base,
      boxShadow: 'none',
      border: '#fff',
      cursor: 'pointer',
      svg: {
        height: '100%',
        margin: '0 0 0 10px',
      },
    };
  },
  option: (base) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    svg: {
      width: '15px',
      height: '100%',
      margin: '0 10px 0 0',
      padding: '0',
    },
  }),
  menu: (base) => ({
    ...base,
    minWidth: '135px',
  }),
  dropdownIndicator: (base, state) => {
    const changes = {
      padding: '0',
      svg: {
        transition: 'all .2s ease',
        transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      },
      span: {
        borderColor: state.selectProps.menuIsOpen && '#000 transparent transparent transparent',
      },
    };
    return Object.assign(base, changes);
  },
};
