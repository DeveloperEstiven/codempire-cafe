import { IDropdownData, TDropdownData } from '@components/dropdown/dropdown.typings';

export interface IDataOrganizerProps {
  onFilterClick: () => void;
  sortItems: IDropdownData[];
  selectedSort: TDropdownData;
  setSelectedSort: React.Dispatch<React.SetStateAction<TDropdownData>>;
}
