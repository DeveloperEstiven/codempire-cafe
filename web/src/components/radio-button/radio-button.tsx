import { IRadioButtonProps } from './radio-button.typings';

import { StyledRadio as Styled } from './radio-button.styles';

export const RadioButton: React.FC<IRadioButtonProps> = ({ name, label }) => {
  return (
    <>
      <Styled.Input value={label} type="radio" id={label + name} name={name} />
      <Styled.Label htmlFor={label + name}>{label}</Styled.Label>
    </>
  );
};
