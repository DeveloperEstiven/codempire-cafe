import styled, { css } from 'styled-components';

import { animationTime, delay } from './animation.constants';
import { IAnimationStylesProps } from './animation.typings';

const animation = ({ delay, animationTime, animationName }: IAnimationStylesProps) => css`
  animation-name: ${animationName};
  animation-fill-mode: forwards;
  animation-delay: ${delay + 's'};
  animation-duration: ${animationTime + 's'};
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-timing-function: linear;
`;

export const StyledAnimation = styled.div`
  @keyframes logo {
    to {
      transform: scale(81%);
      margin-top: 35px;
    }
  }

  @keyframes iBlock {
    to {
      height: 0px;
    }
  }

  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.bg};

  i {
    display: block;
    ${animation({ animationName: 'iBlock', animationTime, delay })};
    height: calc(50vh - 120px);
  }

  div > img {
    ${animation({ animationName: 'logo', animationTime, delay })};
    width: 262px;
    height: 120px;
  }
`;
