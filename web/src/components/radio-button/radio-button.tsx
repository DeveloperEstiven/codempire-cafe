import { StyledRadio as Styled } from './radio-button.styles';
import { IRadioButtonProps } from './radio-button.typings';

export const RadioButton: React.FC<IRadioButtonProps> = ({ value, onChange, name, label, checked }) => {
  return (
    <>
      <Styled.Input value={value} onChange={onChange} type="radio" id={label + name} name={name} checked={checked} />
      <Styled.Label htmlFor={label + name}>{label}</Styled.Label>
    </>
  );
};
