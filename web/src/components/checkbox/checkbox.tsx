import { CheckboxWrapper, StyledCheckbox } from './checkbox.styles';
import { ICheckboxProps } from './checkbox.typings';

export const Checkbox: React.FC<ICheckboxProps> = ({ id, value, isChecked, checkHandler, isReadOnly }) => {
  return (
    <CheckboxWrapper>
      <StyledCheckbox
        isReadOnly={isReadOnly}
        id={id}
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={checkHandler}
        readOnly={isReadOnly}
      />
      <label htmlFor={id}>{value}</label>
    </CheckboxWrapper>
  );
};
