export interface INotificationsDrawer {
  setIsActive: (value: React.SetStateAction<boolean>) => void;
  isActive: boolean;
}
