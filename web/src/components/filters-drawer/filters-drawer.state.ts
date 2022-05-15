import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetProductCategoriesQuery } from '@services/main-page-api';
import { categoriesReceived, setActiveFilter } from '@store/reducers/main-page';
import { showScrollBar } from '@utils/scrollbar';
import { TInputEvent } from 'typings/api';
import { IFiltersDrawer } from './filters-drawer.typings';

export const useFiltersDrawerState = (props: IFiltersDrawer) => {
  const { setIsActive } = props;
  const { activeFilters } = useAppSelector((store) => store.mainPage);
  const [checkedState, setCheckedState] = useState(activeFilters);
  const dispatch = useAppDispatch();
  const { data: categories } = useGetProductCategoriesQuery();

  useEffect(() => {
    if (categories) {
      dispatch(categoriesReceived(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (activeFilters) {
      setCheckedState(activeFilters);
    }
  }, [activeFilters]);

  const handleCheck = (e: TInputEvent) => {
    const value = e.target.value;
    let newState;
    if (checkedState.includes(value)) {
      newState = checkedState.filter((title) => title !== value);
    } else {
      newState = [...checkedState, value];
    }
    setCheckedState(newState);
  };

  const onCloseDrawer = () => {
    showScrollBar();
    onFiltersApply();
    setIsActive(false);
  };

  const onFiltersApply = () => {
    showScrollBar();
    setIsActive(false);
    dispatch(setActiveFilter(checkedState));
  };

  return {
    handleCheck,
    onCloseDrawer,
    onFiltersApply,
    categories,
    checkedState,
  };
};
