import { useCallback, useEffect, useState } from 'react';

import { successMixin } from '@constants/pop-up-messages';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import { useLazyGetMenusQuery } from '@services/main-page-api';
import { removeItem } from '@store/reducers/cart';
import { deletedMenuIdReceived } from '@store/reducers/main-page';
import { IMenu } from 'typings/api';

export const useMenusListState = () => {
  const { searchTerm, activeFilters, sort, deletedMenuId } = useAppSelector((store) => store.mainPage);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [getMenus, { isLoading }] = useLazyGetMenusQuery();
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [searchedMenus, setSearchedMenus] = useState<IMenu[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMenus([]);
    setPage(1);
  }, [activeFilters, sort, debouncedSearchTerm]);

  useEffect(() => {
    if (deletedMenuId) {
      setMenus(menus.filter((menu) => menu.id !== deletedMenuId));
      dispatch(removeItem({ id: deletedMenuId }));
      dispatch(deletedMenuIdReceived(''));
      successMixin({ title: 'menu successfully deleted' }).fire();
    }
  }, [deletedMenuId]);

  const fetchMenus = useCallback(async () => {
    const res = await getMenus({
      queries: { page },
      filter: {
        subcategories: activeFilters,
        term: debouncedSearchTerm,
        sort: {
          field: sort?.field,
          order: sort?.order,
        },
      },
    }).unwrap();

    if (res) {
      setHasMore(res.meta.hasNextPage);
      if (debouncedSearchTerm) {
        if (page === 1) {
          return setSearchedMenus(res.items);
        }
        setSearchedMenus((prev) => [...prev, ...res.items]);
      } else {
        setSearchedMenus([]);
        if (page === 1) {
          return setMenus(res.items);
        }
        const uniqueMenus = [...new Map([...menus, ...res.items].map((item) => [item['id'], item])).values()];
        setMenus(uniqueMenus);
      }
    }
  }, [page, debouncedSearchTerm, activeFilters, sort]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    menus: debouncedSearchTerm ? searchedMenus : menus,
    hasMore,
    fetchMore,
    isLoading,
  };
};
