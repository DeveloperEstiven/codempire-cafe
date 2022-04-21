export interface ITypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
  titles: string[];
}
