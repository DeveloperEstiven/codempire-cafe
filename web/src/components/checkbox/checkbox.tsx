import { CheckboxWrapper, StyledCheckbox } from './checkbox.styles';
import { ICheckboxProps } from './checkbox.typings';

export const Checkbox: React.FC<ICheckboxProps> = ({ id, value, isChecked, checkHandler }) => {
  return (
    <CheckboxWrapper>
      <StyledCheckbox id={id} type="checkbox" value={value} checked={isChecked} onChange={checkHandler} />
      <label htmlFor={id}>{value}</label>
    </CheckboxWrapper>
  );
};
