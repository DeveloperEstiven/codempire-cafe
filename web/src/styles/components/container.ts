import styled from 'styled-components';

import { media } from '@styles/media';

export const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidthContainer};
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  ${media.desktop} {
    max-width: 970px;
  }
  ${media.laptop} {
    max-width: 750px;
  }
  ${media.tablet} {
    max-width: none;
    padding: 0 10px;
  }
`;
