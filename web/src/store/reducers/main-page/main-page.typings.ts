import { ISort } from 'typings/api';

export interface IMainPageInitialState {
  searchTerm: string;
  isFilterApplied: boolean;
  activeFilters: string[];
  sort: Omit<ISort, 'label' | 'value'>;
}
