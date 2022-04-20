import { DataOrganizer } from '@components/data-organizer';
import { FiltersDrawer } from '@components/filters-drawer';
import { MenusList } from '@components/menus-list';
import { ProductsList } from '@components/products-list';
import { useMainPage } from './main-page.state';
import { StyledMainPage as Styled } from './main-page.styles';

export const MainPage: React.FC = () => {
  const {
    selectedType,
    onProductTypeClick,
    onMenuTypeClick,
    setIsFilterActive,
    onFilterClick,
    isFilterActive,
    checkedFilterState,
    setCheckedFilterState,
  } = useMainPage();

  return (
    <Styled.MainPage>
      <FiltersDrawer
        checkedState={checkedFilterState}
        setCheckedState={setCheckedFilterState}
        isActive={isFilterActive}
        setIsActive={setIsFilterActive}
      />

      <Styled.ProductType>
        <Styled.ProductTypeItem isActive={selectedType === 'menu'} onClick={onMenuTypeClick}>
          <span>menu</span>
        </Styled.ProductTypeItem>
        <Styled.ProductTypeItem isActive={selectedType === 'product'} onClick={onProductTypeClick}>
          <span>product</span>
        </Styled.ProductTypeItem>
      </Styled.ProductType>

      <DataOrganizer onFilterClick={onFilterClick} />

      {selectedType === 'menu' ? <MenusList /> : <ProductsList />}
    </Styled.MainPage>
  );
};
