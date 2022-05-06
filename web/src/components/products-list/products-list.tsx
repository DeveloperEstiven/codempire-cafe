import InfiniteScroll from 'react-infinite-scroll-component';

import { ItemCard } from '@components/item-card';
import { Loader } from '@components/loader';
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
          <ItemCard key={menu.id} item={menu} />
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
