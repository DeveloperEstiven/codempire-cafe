import SimpleBar from 'simplebar-react';

import { FilterGroup } from '@components/filter-group';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { useGetProductCategoriesQuery } from '@services/main-page-api';
import { Button } from '@styles/components/button';
import { capitalize } from '@utils/capitalize';
import 'react-modern-drawer/dist/index.css';
import 'simplebar/dist/simplebar.min.css';
import { useFiltersDrawerState } from './filters-drawer.state';
import { StyledFiltersDrawer as Styled } from './filters-drawer.styles';
import { IFiltersDrawerProps } from './filters-drawer.typings';

export const FiltersDrawer: React.FC<IFiltersDrawerProps> = ({
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

  const { data: categories } = useGetProductCategoriesQuery();

  return (
    <Styled.Drawer open={isActive} duration={200} onClose={onCloseDrawer} direction="right">
      <Styled.Wrapper>
        <SimpleBar style={{ height: '89%' }}>
          <>
            <Styled.Header>
              <Icon type="filter" />
              Filters
            </Styled.Header>

            {!categories && <Loader />}

            {categories &&
              Object.keys(categories).map((group) => (
                <FilterGroup
                  key={group}
                  name={capitalize(group)}
                  data={categories[group]}
                  handleCheck={handleCheck}
                  checkedState={checkedState}
                />
              ))}
          </>
        </SimpleBar>
        <Button color="black" onClick={onFiltersApply}>
          Apply
        </Button>
      </Styled.Wrapper>
    </Styled.Drawer>
  );
};
