import SimpleBar from 'simplebar-react';

import { FilterGroup } from '@components/filter-group';
import { Icon } from '@components/icon';
import { Button } from '@styles/components/button';
import { capitalize } from '@utils/capitalize';

import { useFiltersDrawerState } from './filters-drawer.state';

import { IFiltersDrawerProps } from './filters-drawer.typings';

import 'react-modern-drawer/dist/index.css';
import 'simplebar/dist/simplebar.min.css';
import { StyledFiltersDrawer as Styled } from './filters-drawer.styles';

export const FiltersDrawer: React.FC<IFiltersDrawerProps> = ({
  data,
  isActive,
  setIsActive,
  checkedState,
  setCheckedState,
}) => {
  const { handleCheck, onCloseDrawer, onFiltersApply } = useFiltersDrawerState({
    setIsActive,
    checkedState,
    setCheckedState,
  });

  return (
    <Styled.Drawer open={isActive} duration={200} onClose={onCloseDrawer} direction="right">
      <Styled.Wrapper>
        <SimpleBar style={{ height: '89%' }}>
          <div>
            <Styled.Header>
              <Icon type="filter" />
              Filters
            </Styled.Header>

            {Object.keys(data).map((group) => (
              <FilterGroup
                key={group}
                name={capitalize(group)}
                data={data[group]}
                handleCheck={handleCheck}
                checkedState={checkedState}
              />
            ))}
          </div>
        </SimpleBar>
        <Button color="black" onClick={onFiltersApply}>
          Apply
        </Button>
      </Styled.Wrapper>
    </Styled.Drawer>
  );
};
