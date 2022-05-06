import { Icon } from '@components/icon';
import { NotificationsDrawer } from '@components/notifications-drawer';
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
    isNotificationsOpen,
    isNotificationsExists,
    setIsNotificationsOpen,
    selectedPage,
    isSearchActive,
    inputRef,
    searchTerm,
    totalItems,
    storeSearchTerm,
  } = useAsideMenu();

  const onPageItemClick = (page: TPage) => () => onItemClick(page);

  return (
    <>
      <NotificationsDrawer isActive={isNotificationsOpen} setIsActive={setIsNotificationsOpen} />

      <Styled.Aside>
        <Styled.Group>
          {pages.map(({ page, icon }) => (
            <Styled.Item key={page} isActive={selectedPage === page} onClick={onPageItemClick(page)}>
              <Icon type={icon} />
            </Styled.Item>
          ))}
        </Styled.Group>

        <Styled.Group>
          <Styled.Item onClick={onNotificationClick}>
            <Styled.IconButton isWithMark={isNotificationsExists}>
              <Icon type="notification" />
            </Styled.IconButton>
          </Styled.Item>

          <Styled.Item onClick={onCartClick}>
            <Styled.Cart count={totalItems}>
              <Icon type="cart" />
            </Styled.Cart>
          </Styled.Item>

          <Styled.Item>
            <Styled.IconButton onClick={onSearchClick} isWithMark={!!storeSearchTerm}>
              <Icon type="search" />
            </Styled.IconButton>
            <Styled.Search isActive={isSearchActive}>
              {<input ref={inputRef} onBlur={onSearchBlur} value={searchTerm} onChange={onChangeSearch} />}
            </Styled.Search>
          </Styled.Item>
        </Styled.Group>
      </Styled.Aside>
    </>
  );
};
