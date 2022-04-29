import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { searchTermReceived, selectedPageReceived } from '@store/reducers/main-page';
import { TInputEvent } from 'typings/api';
import { TPage } from './aside-menu.typings';

export const useAsideMenu = () => {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((store) => store.cart);
  const { searchTerm: storeSearchTerm, selectedPage } = useAppSelector((store) => store.mainPage);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState(storeSearchTerm);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onItemClick = (page: TPage) => {
    dispatch(selectedPageReceived(page));
    navigate(page);
  };

  const onNotificationClick = () => {
    console.log('onNotificationClick');
  };

  const onCartClick = () => {
    navigate(ROUTES.cart);
  };

  const onSearchClick = () => {
    setIsSearchActive((prev) => !prev);
    inputRef.current?.focus();
  };

  const onSearchBlur = () => {
    setIsSearchActive(false);
  };

  const onChangeSearch = (e: TInputEvent) => {
    setSearchTerm(e.target.value);
    dispatch(searchTermReceived(e.target.value));
  };

  return {
    onItemClick,
    onNotificationClick,
    onCartClick,
    onSearchClick,
    onSearchBlur,
    onChangeSearch,
    totalItems,
    inputRef,
    selectedPage,
    isSearchActive,
    searchTerm,
    storeSearchTerm,
  };
};
