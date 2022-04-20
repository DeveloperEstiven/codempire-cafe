import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '@components/loader';
import { ProductCard } from '@components/product-card';
import { StyledProductsList as Styled } from '@styles/components/products-list';
import { useMenusListState } from './menus-list.state';

export const MenusList: React.FC = () => {
  const { isLoading, menus, hasMore, fetchMore } = useMenusListState();

  return (
    <InfiniteScroll
      dataLength={menus.length}
      style={{ overflow: 'initial' }}
      next={fetchMore}
      hasMore={hasMore}
      loader={<></>}
    >
      <Styled.List>
        {menus.map((menu) => (
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
