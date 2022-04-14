import { ProductCard } from '@components/product-card';

import { IProductsListProps } from './products-list.typings';

import { StyledProductsList as Styled } from './products-list.styles';

export const ProductsList: React.FC<IProductsListProps> = ({ selectedType, menus, products }) => {
  return (
    <Styled.List>
      {selectedType === 'menu' && menus.map((menu) => <ProductCard key={menu.id} product={menu} />)}
      {!menus.length && selectedType === 'menu' && <Styled.NotFound>Menus not found</Styled.NotFound>}
      {selectedType === 'product' && products.map((product) => <ProductCard key={product.id} product={product} />)}
      {!products.length && selectedType === 'product' && <Styled.NotFound>Products not found</Styled.NotFound>}
    </Styled.List>
  );
};
