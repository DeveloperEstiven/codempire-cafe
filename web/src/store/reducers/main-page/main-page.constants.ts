import { ISort } from 'typings/api';
import { IMainPageInitialState } from './main-page.typings';

export const mainPageInitialState: IMainPageInitialState = {
  searchTerm: '',
  isFilterApplied: JSON.parse(localStorage.getItem('isFilterApplied') || 'false'),
  activeFilters: JSON.parse(localStorage.getItem('activeFilters') || 'false') || [],
  sort: {} as Omit<ISort, 'label' | 'value'>,
};
