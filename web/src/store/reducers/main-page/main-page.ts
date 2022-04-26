import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISort } from 'typings/api';
import { mainPageInitialState } from './main-page.constants';

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: mainPageInitialState,
  reducers: {
    searchTermReceived(store, action: PayloadAction<string>) {
      store.searchTerm = action.payload;
    },
    setIsFilterApplied(store, action: PayloadAction<boolean>) {
      localStorage.setItem('isFilterApplied', JSON.stringify(action.payload));
      store.isFilterApplied = action.payload;
    },
    setActiveFilter(store, action: PayloadAction<string[]>) {
      localStorage.setItem('activeFilters', JSON.stringify(action.payload));
      store.activeFilters = action.payload;
    },
    setSort(store, action: PayloadAction<ISort>) {
      store.sort = action.payload;
    },
  },
});

const { actions, reducer } = mainPageSlice;
export const { searchTermReceived, setIsFilterApplied, setActiveFilter, setSort } = actions;
export { reducer as mainPageReducer };
