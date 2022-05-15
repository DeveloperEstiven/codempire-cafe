import { Icon } from '@components/icon';
import { NotificationsDrawer } from '@components/notifications-drawer';
import { pages } from './aside-menu.constants';
import { useAsideMenu } from './aside-menu.state';
import { StyledAsideMenu as Styled } from './aside-menu.styles';

export const AsideMenu: React.FC = () => {
  const {
    onItemClick,
    onNotificationClick,
    onCartClick,
    onSearchClick,
    onSearchBlur,
    onChangeSearch,
    isNotificationsOpen,
    setIsNotificationsOpen,
    selectedPage,
    isSearchActive,
    inputRef,
    searchTerm,
    totalItems,
    storeSearchTerm,
    isManager,
    notificationsCount,
    onPageItemClick,
  } = useAsideMenu();

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
            <Styled.IconCount count={notificationsCount}>
              <Icon type="notification" />
            </Styled.IconCount>
          </Styled.Item>
          {!isManager && (
            <Styled.Item onClick={onCartClick}>
              <Styled.IconCount count={totalItems}>
                <Icon type="cart" />
              </Styled.IconCount>
            </Styled.Item>
          )}
          <Styled.Item>
            <Styled.IconButton
              onClick={onSearchClick}
              isWithMark={!!storeSearchTerm}
              disabled={location.pathname !== '/main-page'}
            >
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
