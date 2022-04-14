import { Checkbox } from '@components/checkbox';

import { IFilterGroupProps } from './filter-group.typings';

import { StyledFilterGroup as Styled } from './filter-group.styles';

export const FilterGroup: React.FC<IFilterGroupProps> = ({ name, data, handleCheck, checkedState }) => {
  return (
    <Styled.Group>
      <h3>{name}</h3>
      <ul>
        {data.map((el) => (
          <li key={el}>
            <Checkbox id={el} value={el} checkHandler={handleCheck} isChecked={checkedState.includes(el)} />
          </li>
        ))}
      </ul>
    </Styled.Group>
  );
};
