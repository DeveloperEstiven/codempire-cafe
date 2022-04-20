import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '@components/loader';
import { ProductCard } from '@components/product-card';
import { StyledProductsList as Styled } from '@styles/components/products-list';
import { useProductsListState } from './products-list.state';

export const ProductsList: React.FC = () => {
  const { isLoading, products, hasMore, fetchMore } = useProductsListState();

  return (
    <InfiniteScroll
      dataLength={products.length}
      style={{ overflow: 'initial' }}
      next={fetchMore}
      hasMore={hasMore}
      loader={<></>}
    >
      <Styled.List>
        {products.map((menu) => (
          <ProductCard key={menu.id} product={menu} />
        ))}
      </Styled.List>
      {isLoading && (
        <Styled.LoaderBox>
          <Loader isWithoutArea />
        </Styled.LoaderBox>
      )}
    </InfiniteScroll>
  );
};
