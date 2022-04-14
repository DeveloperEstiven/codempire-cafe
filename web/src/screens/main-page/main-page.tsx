

import { DataOrganizer } from '@components/data-organizer';
import { FiltersDrawer } from '@components/filters-drawer';
import { ProductsList } from '@components/products-list';

import { useMainPage } from './main-page.state';

import { StyledMainPage as Styled } from './main-page.styles';

export const MainPage: React.FC = () => {
  const {
    selectedType,
    selectedSort,
    searchedMenus,
    searchedProducts,
    onProductTypeClick,
    onMenuTypeClick,
    setIsFilterActive,
    setSelectedSort,
    onFilterClick,
    isFilterActive,
    checkedFilterState,
    setCheckedFilterState,
    filterData,
    sortItems,
  } = useMainPage();

  return (
    <Styled.MainPage>
      <FiltersDrawer
        checkedState={checkedFilterState}
        setCheckedState={setCheckedFilterState}
        data={filterData}
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

      <DataOrganizer
        onFilterClick={onFilterClick}
        sortItems={sortItems}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <ProductsList selectedType={selectedType} menus={searchedMenus} products={searchedProducts} />
    </Styled.MainPage>
  );
};
