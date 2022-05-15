import { ICategories, IMenu, IProduct, ISort } from 'typings/api';
import { IMainPageInitialState } from './main-page.typings';

export const mainPageInitialState: IMainPageInitialState = {
  searchTerm: '',
  isFilterApplied: false,
  activeFilters: [],
  sort: {
    label: 'sorting by',
    value: '5',
    field: 'default',
    order: 'ASC',
  } as ISort,
  selectedPage: 'main',
  newProduct: {} as IProduct,
  deletedProductId: '',
  updatedMenu: {} as IMenu,
  newMenu: {} as IMenu,
  deletedMenuId: '',
  categories: {} as ICategories,
  selectedTab: 'menu',
};
