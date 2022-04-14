import { Outlet, useLocation } from 'react-router-dom';

import { AsideMenu } from '@components/aside-menu';
import { Container, ContainerWrapper } from '@styles/components/container';

import { TRoutes } from '@constants/routes';

import { ILayoutProps } from './layout.typings';

export const Layout: React.FC<ILayoutProps> = ({ hideAsideMenuPaths = [] }) => {
  const { pathname } = useLocation();

  return (
    <>
      <ContainerWrapper>
        {!hideAsideMenuPaths.includes(pathname as TRoutes) && <AsideMenu />}
        <Container>
          <Outlet />
        </Container>
      </ContainerWrapper>
    </>
  );
};
