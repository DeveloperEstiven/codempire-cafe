import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { mainPageInitialState } from './main-page.constants';

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: mainPageInitialState,
  reducers: {
    searchTermReceived(store, action: PayloadAction<string>) {
      store.searchTerm = action.payload;
    },
    setIsFilterApplied(store, action: PayloadAction<boolean>) {
      store.isFilterApplied = action.payload;
    },
  },
});

const { actions, reducer } = mainPageSlice;
export const { searchTermReceived, setIsFilterApplied } = actions;
export { reducer as mainPageReducer };
