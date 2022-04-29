import { ISort } from 'typings/api';
import { IMainPageInitialState } from './main-page.typings';

export const mainPageInitialState: IMainPageInitialState = {
  searchTerm: '',
  isFilterApplied: false,
  activeFilters: [],
  sort: {} as Omit<ISort, 'label' | 'value'>,
  selectedPage: 'main',
};
