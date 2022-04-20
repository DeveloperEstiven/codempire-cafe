import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Dropdown } from '@components/dropdown';
import { TDropdownData } from '@components/dropdown/dropdown.typings';
import { Icon } from '@components/icon';
import { useAppSelector } from '@hooks/redux';
import { setSort } from '@store/reducers/main-page';
import { ISort } from 'typings/api';
import { useAppDispatch } from '../../hooks/redux';
import { sortItems } from './data-organizer.constants';
import { sortingStyles, StyledDataOrganizer as Styled } from './data-organizer.styles';
import { IDataOrganizerProps } from './data-organizer.typings';

export const DataOrganizer: React.FC<IDataOrganizerProps> = ({ onFilterClick }) => {
  const { isFilterApplied } = useAppSelector((store) => store.mainPage);
  const [selectedSort, setSelectedSort] = useState<ISort>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSort(selectedSort as ISort));
  }, [selectedSort]);

  return (
    <Styled.FilterWrapper>
      <Styled.FilterItem onClick={onFilterClick} isFilterApplied={isFilterApplied}>
        <Icon type="filter" />
        <span>filters</span>
      </Styled.FilterItem>
      <Styled.FilterItem>
        <Dropdown
          isSearchable={false}
          placeholder="sorting by"
          stylesConfig={sortingStyles}
          selected={selectedSort}
          setSelected={setSelectedSort as Dispatch<SetStateAction<TDropdownData>>}
          items={sortItems}
        />
      </Styled.FilterItem>
    </Styled.FilterWrapper>
  );
};
