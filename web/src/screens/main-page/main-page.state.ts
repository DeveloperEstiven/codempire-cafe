import { useMemo, useState } from 'react';

import { useAppSelector } from '@hooks/redux';
import { hideScrollBar } from '@utils/scrollbar';

import { filterData, menus, products, searchByTerm, sortItems } from './main-page.constants';

import { TDropdownData } from '@components/dropdown/dropdown.typings';
import { TSelectedType } from './main-page.typings';

export const useMainPage = (defaultSelected: TSelectedType = 'menu') => {
  const [checkedFilterState, setCheckedFilterState] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<TSelectedType>(defaultSelected);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedSort, setSelectedSort] = useState<TDropdownData>('');

  const term = useAppSelector((store) => store.mainPage.searchTerm);
  const searchedMenus = useMemo(() => searchByTerm(menus, term), [menus, term]);
  const searchedProducts = useMemo(() => searchByTerm(products, term), [products, term]);

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
    selectedSort,
    searchedMenus,
    searchedProducts,
    onProductTypeClick,
    onMenuTypeClick,
    setSelectedSort,
    setIsFilterActive,
    onFilterClick,
    checkedFilterState,
    setCheckedFilterState,
    filterData,
    sortItems,
  };
};
