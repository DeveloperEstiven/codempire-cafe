

export interface IFiltersDrawer {
  checkedState: string[];
  setCheckedState: React.Dispatch<React.SetStateAction<string[]>>;
  setIsActive: (value: React.SetStateAction<boolean>) => void;
}

export interface IFiltersDrawerProps extends IFiltersDrawer {
  isActive: boolean;
}
