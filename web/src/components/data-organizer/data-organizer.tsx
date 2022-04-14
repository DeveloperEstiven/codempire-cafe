import { Dropdown } from '@components/dropdown';
import { Icon } from '@components/icon';
import { useAppSelector } from '@hooks/redux';

import { sortingStyles } from './data-organizer.constants';

import { IDataOrganizerProps } from './data-organizer.typings';

import { StyledDataOrganizer as Styled } from './data-organizer.styles';

export const DataOrganizer: React.FC<IDataOrganizerProps> = ({
  onFilterClick,
  sortItems,
  selectedSort,
  setSelectedSort,
}) => {
  const isFilterApplied = useAppSelector((store) => store.mainPage.isFilterApplied);
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
          setSelected={setSelectedSort}
          items={sortItems}
        />
      </Styled.FilterItem>
    </Styled.FilterWrapper>
  );
};
