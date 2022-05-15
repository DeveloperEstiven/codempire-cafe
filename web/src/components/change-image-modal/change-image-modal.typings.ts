export interface IChangeImageModalProps {
  name?: string;
  handleChange: (b64: string) => void;
  isOpen: boolean;
  close: () => void;
}
