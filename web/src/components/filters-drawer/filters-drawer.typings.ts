export interface IFiltersDrawer {
  setIsActive: (value: React.SetStateAction<boolean>) => void;
}

export interface IFiltersDrawerProps extends IFiltersDrawer {
  isActive: boolean;
}
