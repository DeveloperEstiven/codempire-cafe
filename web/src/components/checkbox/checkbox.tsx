import { ICheckboxProps } from './checkbox.typings';

import { CheckboxWrapper, StyledCheckbox } from './checkbox.styles';

export const Checkbox: React.FC<ICheckboxProps> = ({ id, value, isChecked, checkHandler }) => {
  return (
    <CheckboxWrapper>
      <StyledCheckbox id={id} type="checkbox" value={value} checked={isChecked} onChange={checkHandler} />
      <label htmlFor={id}>{value}</label>
    </CheckboxWrapper>
  );
};
