import { useEffect, useState } from 'react';

import { useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import { useGetProductsMutation } from '@services/main-page-api';
import { IProduct } from 'typings/api';

export const useProductsListState = () => {
  const { searchTerm, activeFilters, sort } = useAppSelector((store) => store.mainPage);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [getProducts, { isLoading }] = useGetProductsMutation();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [activeFilters, sort, debouncedSearchTerm]);

  useEffect(() => {
    getProducts({
      queries: { page },
      filter: {
        subcategories: activeFilters,
        term: debouncedSearchTerm,
        sort: {
          field: sort?.field,
          order: sort?.order,
        },
      },
    })
      .unwrap()
      .then((res) => {
        setHasMore(res.meta.hasNextPage);
        if (debouncedSearchTerm) {
          if (page === 1) {
            return setSearchedProducts(res.items);
          }
          setSearchedProducts((prev) => [...prev, ...res.items]);
        } else {
          setSearchedProducts([]);
          if (page === 1) {
            return setProducts(res.items);
          }
          setProducts((prev) => [...prev, ...res.items]);
        }
      });
  }, [page, debouncedSearchTerm, activeFilters, sort]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    products: debouncedSearchTerm ? searchedProducts : products,
    hasMore,
    fetchMore,
    isLoading,
  };
};
