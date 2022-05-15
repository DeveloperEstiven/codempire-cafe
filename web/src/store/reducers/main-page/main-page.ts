import { TPage } from '@components/aside-menu/aside-menu.typings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSelectedType } from '@screens/main-page/main-page.typings';
import { ICategories, IMenu, ISort } from 'typings/api';
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
    setActiveFilter(store, action: PayloadAction<string[]>) {
      store.activeFilters = action.payload;
      store.isFilterApplied = action.payload.length ? true : false;
    },
    setSort(store, action: PayloadAction<ISort>) {
      store.sort = action.payload;
    },
    newMenuReceived(store, action: PayloadAction<IMenu>) {
      store.newMenu = action.payload;
    },
    updatedMenuReceived(store, action: PayloadAction<IMenu>) {
      store.updatedMenu = action.payload;
    },
    deletedProductIdReceived(store, action: PayloadAction<string>) {
      store.deletedProductId = action.payload;
    },
    deletedMenuIdReceived(store, action: PayloadAction<string>) {
      store.deletedMenuId = action.payload;
    },
    categoriesReceived(store, action: PayloadAction<ICategories>) {
      store.categories = action.payload;
    },
    selectedTabReceived(store, action: PayloadAction<TSelectedType>) {
      store.selectedTab = action.payload;
    },
  },
});
const { actions, reducer } = mainPageSlice;
export const {
  searchTermReceived,
  setActiveFilter,
  setSort,
  selectedPageReceived,
  updatedMenuReceived,
  deletedProductIdReceived,
  deletedMenuIdReceived,
  newMenuReceived,
  categoriesReceived,
  selectedTabReceived,
} = actions;
export { reducer as mainPageReducer };
