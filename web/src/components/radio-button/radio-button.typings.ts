export interface IRadioButtonProps {
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
