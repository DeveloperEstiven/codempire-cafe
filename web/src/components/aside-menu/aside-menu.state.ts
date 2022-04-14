import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@hooks/redux';
import { searchTermReceived } from '@store/reducers/main-page';

import { TInputEvent } from 'typings/api';

import { TPage } from './aside-menu.typings';

export const useAsideMenu = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<TPage>('main');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onItemClick = (name: TPage) => {
    setSelected(name);
    navigate(name);
  };

  const onNotificationClick = () => {
    console.log('onNotificationClick');
  };

  const onCartClick = () => {
    console.log('onCartClick');
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
    inputRef,
    selected,
    isSearchActive,
    searchTerm,
  };
};
