import { Logo } from '@components/logo';

import { StyledPage } from './page-404.styles';

export const Page404: React.FC = () => {
  return (
    <StyledPage>
      <Logo />
      <p>Page Not Found</p>
    </StyledPage>
  );
};
