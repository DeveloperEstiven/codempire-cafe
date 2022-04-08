import { IHeaderProps } from './header.typings';

import { StyledHeader } from './header.styles';

export const Header: React.FC<IHeaderProps> = ({ text }) => {
  return <StyledHeader>{text}</StyledHeader>;
};
