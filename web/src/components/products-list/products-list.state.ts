import { useEffect, useState } from 'react';

import { successMixin } from '@constants/pop-up-messages';
import { useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import { useLazyGetProductCategoriesQuery, useLazyGetProductsQuery } from '@services/main-page-api';
import { removeItem } from '@store/reducers/cart';
import { deletedProductIdReceived, setActiveFilter } from '@store/reducers/main-page';
import { IProduct } from 'typings/api';
import { useAppDispatch } from '../../hooks/redux';

export const useProductsListState = () => {
  const { searchTerm, activeFilters, sort, deletedProductId } = useAppSelector((store) => store.mainPage);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [getProducts, { isLoading }] = useLazyGetProductsQuery();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);
  const [getCategories, { data: receivedCategories }] = useLazyGetProductCategoriesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [activeFilters, sort, debouncedSearchTerm]);

  useEffect(() => {
    if (receivedCategories) {
      const flatCategories = Object.values(receivedCategories).flat();
      const intersection = flatCategories.filter((x) => activeFilters.includes(x));
      dispatch(setActiveFilter(intersection));
    }
  }, [receivedCategories]);

  useEffect(() => {
    if (deletedProductId) {
      setProducts(products.filter((product) => product.id !== deletedProductId));
      dispatch(removeItem({ id: deletedProductId }));
      dispatch(deletedProductIdReceived(''));
      successMixin({ title: 'product successfully deleted' }).fire();
      getCategories();
    }
  }, [deletedProductId]);

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
          const uniqueProducts = [...new Map([...products, ...res.items].map((item) => [item['id'], item])).values()];
          setProducts(uniqueProducts);
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
