import InfiniteScroll from 'react-infinite-scroll-component';

import { ItemCard } from '@components/item-card';
import { Loader } from '@components/loader';
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
