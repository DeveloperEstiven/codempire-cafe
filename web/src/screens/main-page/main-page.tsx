import { DataOrganizer } from '@components/data-organizer';
import { FiltersDrawer } from '@components/filters-drawer';
import { MenusList } from '@components/menus-list';
import { ProductsList } from '@components/products-list';
import { TypeSelector } from '@components/type-selector';
import { AddItemButton } from '@styles/components/add-item';
import { useMainPage } from './main-page.state';
import { StyledMainPage as Styled } from './main-page.styles';

export const MainPage: React.FC = () => {
  const { selectedType, setIsFilterActive, onFilterClick, isFilterActive, onTypeSelect, onAddItemClick, isManager } =
    useMainPage();

  return (
    <>
      <Styled.MainPage>
        <FiltersDrawer isActive={isFilterActive} setIsActive={setIsFilterActive} />

        {isManager && <AddItemButton onClick={onAddItemClick} />}

        <TypeSelector titles={['menu', 'product']} onTypeSelect={onTypeSelect} selectedType={selectedType} />

        <DataOrganizer onFilterClick={onFilterClick} />

        {selectedType === 'menu' ? <MenusList /> : <ProductsList />}
      </Styled.MainPage>
    </>
  );
};
