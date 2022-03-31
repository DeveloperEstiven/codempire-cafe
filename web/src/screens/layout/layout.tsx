import { Outlet } from 'react-router-dom';

import { Container } from '@styles/components/container';

export const Layout = () => {
  return (
    <Container>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </Container>
  );
};
