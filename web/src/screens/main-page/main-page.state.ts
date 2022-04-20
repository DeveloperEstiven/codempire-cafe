import { useState } from 'react';

import { hideScrollBar } from '@utils/scrollbar';
import { TSelectedType } from './main-page.typings';

export const useMainPage = (defaultSelected: TSelectedType = 'menu') => {
  const [checkedFilterState, setCheckedFilterState] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<TSelectedType>(defaultSelected);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const onProductTypeClick = () => {
    setSelectedType('product');
  };

  const onMenuTypeClick = () => {
    setSelectedType('menu');
  };

  const onFilterClick = () => {
    hideScrollBar();
    setIsFilterActive(true);
  };

  return {
    selectedType,
    isFilterActive,
    onProductTypeClick,
    onMenuTypeClick,
    setIsFilterActive,
    onFilterClick,
    checkedFilterState,
    setCheckedFilterState,
  };
};
