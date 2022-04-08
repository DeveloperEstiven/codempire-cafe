import { ICheckboxProps } from './checkbox.typings';

import { CheckboxWrapper, StyledCheckbox } from './checkbox.styles';

export const Checkbox: React.FC<ICheckboxProps> = ({ id, value, isChecked, checkHandler }) => {
  // const [checkedState, setCheckedState] = useState<string[]>([]);

  // const handleCheck = (e: TInputEvent) => {
  //   const value = e.target.value;
  //   let newState;
  //   if (checkedState.includes(value)) {
  //     newState = checkedState.filter((title) => title !== value);
  //   } else {
  //     newState = [...checkedState, value];
  //   }
  //   setCheckedState(newState);
  // };

  return (
    <CheckboxWrapper>
      <StyledCheckbox id={id} type="checkbox" value={value} checked={isChecked} onChange={checkHandler} />
      <label htmlFor={id}>{value}</label>
    </CheckboxWrapper>
  );
};
