import { Icon } from '@components/icon';
import { pages } from './aside-menu.constants';
import { useAsideMenu } from './aside-menu.state';
import { StyledAsideMenu as Styled } from './aside-menu.styles';
import { TPage } from './aside-menu.typings';

export const AsideMenu: React.FC = () => {
  const {
    onItemClick,
    onNotificationClick,
    onCartClick,
    onSearchClick,
    onSearchBlur,
    onChangeSearch,
    selected,
    isSearchActive,
    inputRef,
    searchTerm,
  } = useAsideMenu();

  const onPageItemClick = (name: TPage) => () => onItemClick(name);

  return (
    <Styled.Aside>
      <Styled.Group>
        {pages.map((item) => (
          <Styled.Item key={item.name} isActive={selected === item.name} onClick={onPageItemClick(item.name)}>
            {item.element}
          </Styled.Item>
        ))}
      </Styled.Group>

      <Styled.Group>
        <Styled.Item onClick={onNotificationClick}>
          <Icon type="notification" />
        </Styled.Item>
        <Styled.Item onClick={onCartClick}>
          <Icon type="cart" />
        </Styled.Item>
        <Styled.Item>
          <Styled.SearchButton onClick={onSearchClick} isSearchValue={!!searchTerm.length}>
            <Icon type="search" />
          </Styled.SearchButton>
          <Styled.Search isActive={isSearchActive}>
            {<input ref={inputRef} onBlur={onSearchBlur} value={searchTerm} onChange={onChangeSearch} />}
          </Styled.Search>
        </Styled.Item>
      </Styled.Group>
    </Styled.Aside>
  );
};
