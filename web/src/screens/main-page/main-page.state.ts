import { useState } from 'react';

import { useAppSelector } from '@hooks/redux';
import { hideScrollBar } from '@utils/scrollbar';
import { TSelectedType } from './main-page.typings';

export const useMainPage = (defaultSelected: TSelectedType = 'menu') => {
  const { activeFilters } = useAppSelector((store) => store.mainPage);
  const [checkedFilterState, setCheckedFilterState] = useState<string[]>(activeFilters);
  const [selectedType, setSelectedType] = useState<TSelectedType>(defaultSelected);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const onTypeSelect = (type: string) => {
    setSelectedType(type as TSelectedType);
  };

  const onFilterClick = () => {
    hideScrollBar();
    setIsFilterActive(true);
  };

  return {
    selectedType,
    isFilterActive,
    setIsFilterActive,
    onFilterClick,
    checkedFilterState,
    setCheckedFilterState,
    onTypeSelect,
  };
};
