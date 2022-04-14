import { GroupBase, StylesConfig } from 'react-select';

import { IDropdownData } from '@components/dropdown/dropdown.typings';

export const sortingStyles: StylesConfig<IDropdownData, boolean, GroupBase<IDropdownData>> = {
  control: (base) => {
    return {
      ...base,
      boxShadow: 'none',
      border: '#fff',
      cursor: 'pointer',
    };
  },
  dropdownIndicator: (base, state) => {
    const changes = {
      transition: 'all .2s ease',
      padding: '0',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      span: {
        borderColor: state.selectProps.menuIsOpen && '#000 transparent transparent transparent',
      },
    };
    return Object.assign(base, changes);
  },
};
