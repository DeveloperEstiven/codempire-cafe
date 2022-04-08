import { IMAGES } from '@constants/images';

import { ILogoProps } from './logo.typings';

import { StyledLogo as Styled } from './logo.styles';

export const Logo: React.FC<ILogoProps> = ({ isWhite }) => (
  <Styled.Wrapper>
    <Styled.Image src={isWhite ? IMAGES.logoWhite : IMAGES.logoDark} alt="Logo" />
  </Styled.Wrapper>
);
