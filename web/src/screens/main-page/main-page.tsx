import { DataOrganizer } from '@components/data-organizer';
import { FiltersDrawer } from '@components/filters-drawer';
import { MenusList } from '@components/menus-list';
import { ProductsList } from '@components/products-list';
import { TypeSelector } from '@components/type-selector';
import { useMainPage } from './main-page.state';
import { StyledMainPage as Styled } from './main-page.styles';

export const MainPage: React.FC = () => {
  const {
    selectedType,
    setIsFilterActive,
    onFilterClick,
    isFilterActive,
    checkedFilterState,
    setCheckedFilterState,
    onTypeSelect,
  } = useMainPage();

  return (
    <Styled.MainPage>
      <FiltersDrawer
        checkedState={checkedFilterState}
        setCheckedState={setCheckedFilterState}
        isActive={isFilterActive}
        setIsActive={setIsFilterActive}
      />

      <TypeSelector titles={['menu', 'product']} onTypeSelect={onTypeSelect} selectedType={selectedType} />

      <DataOrganizer onFilterClick={onFilterClick} />

      {selectedType === 'menu' ? <MenusList /> : <ProductsList />}
    </Styled.MainPage>
  );
};
