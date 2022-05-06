import { Link } from 'react-router-dom';

import { Logo } from '@components/logo';
import { ROUTES } from '@constants/routes';
import { StyledNotFound as Styled } from './not-found.styles';
import { INotFoundProps } from './not-found.typings';

export const NotFound: React.FC<INotFoundProps> = ({ title, isButtonHide }) => {
  return (
    <Styled.NotFound>
      <Logo />
      <div>{title}</div>
      {!isButtonHide && <Link to={ROUTES.mainPage}>Start Shopping</Link>}
    </Styled.NotFound>
  );
};
