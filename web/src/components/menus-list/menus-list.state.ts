import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import { useGetMenusMutation } from '@services/main-page-api';
import { IMenu } from 'typings/api';

export const useMenusListState = () => {
  const { searchTerm, activeFilters, sort } = useAppSelector((store) => store.mainPage);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [getMenus, { isLoading }] = useGetMenusMutation();
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [searchedMenus, setSearchedMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    setMenus([]);
    setPage(1);
  }, [activeFilters, sort, debouncedSearchTerm]);

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
        setMenus((prev) => [...prev, ...res.items]);
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
