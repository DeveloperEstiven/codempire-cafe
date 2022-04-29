import { TPage } from '@components/aside-menu/aside-menu.typings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISort } from 'typings/api';
import { mainPageInitialState } from './main-page.constants';

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: mainPageInitialState,
  reducers: {
    selectedPageReceived(store, action: PayloadAction<TPage>) {
      store.selectedPage = action.payload;
    },
    searchTermReceived(store, action: PayloadAction<string>) {
      store.searchTerm = action.payload;
    },
    setIsFilterApplied(store, action: PayloadAction<boolean>) {
      store.isFilterApplied = action.payload;
    },
    setActiveFilter(store, action: PayloadAction<string[]>) {
      store.activeFilters = action.payload;
    },
    setSort(store, action: PayloadAction<ISort>) {
      store.sort = action.payload;
    },
  },
});

const { actions, reducer } = mainPageSlice;
export const { searchTermReceived, setIsFilterApplied, setActiveFilter, setSort, selectedPageReceived } = actions;
export { reducer as mainPageReducer };
