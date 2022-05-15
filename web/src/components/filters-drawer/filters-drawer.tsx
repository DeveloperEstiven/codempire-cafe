import { FilterGroup } from '@components/filter-group';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { Button } from '@styles/components/button';
import { Drawer } from '@styles/components/drawer';
import { capitalize } from '@utils/capitalize';
import 'react-modern-drawer/dist/index.css';
import { useFiltersDrawerState } from './filters-drawer.state';
import { StyledFiltersDrawer as Styled } from './filters-drawer.styles';
import { IFiltersDrawerProps } from './filters-drawer.typings';

export const FiltersDrawer: React.FC<IFiltersDrawerProps> = ({ isActive, setIsActive }) => {
  const { handleCheck, onCloseDrawer, onFiltersApply, categories, checkedState } = useFiltersDrawerState({
    setIsActive,
  });

  return (
    <Drawer.Item open={isActive} duration={200} onClose={onCloseDrawer} direction="right">
      <Styled.Header>
        <Icon type="filter" />
        Filters
      </Styled.Header>

      <Styled.Wrapper>
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
      </Styled.Wrapper>
      <Styled.ButtonWrapper>
        <Button color="black" onClick={onFiltersApply}>
          Apply
        </Button>
      </Styled.ButtonWrapper>
    </Drawer.Item>
  );
};
