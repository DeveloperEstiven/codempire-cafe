import { TPage } from '@components/aside-menu/aside-menu.typings';
import { TSelectedType } from '@screens/main-page/main-page.typings';
import { ICategories, IMenu, IProduct, ISort } from 'typings/api';

export interface IMainPageInitialState {
  searchTerm: string;
  isFilterApplied: boolean;
  activeFilters: string[];
  sort: ISort;
  selectedPage: TPage;
  newProduct: IProduct;
  deletedProductId: string;
  updatedMenu: IMenu;
  newMenu: IMenu;
  deletedMenuId: string;
  categories: ICategories;
  selectedTab: TSelectedType;
}
