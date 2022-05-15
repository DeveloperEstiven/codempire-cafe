import styled from 'styled-components';

import { List, SectionHeader } from '@screens/profile-page/profile-page.styles';
import { media } from '@styles/media';

export const StyledAddresses = {
  Header: styled(SectionHeader)`
    i {
      position: relative;
      display: block;
      cursor: pointer;
      padding: 10px;

      &:hover::after,
      &:hover::before {
        transform: scale(120%);
      }

      &::after,
      &::before {
        content: '';
        transition: transform ${(prop) => prop.theme.transition} ease 0s;
        position: absolute;
        display: block;
        background-color: #000;
        top: 9px;
        left: 3px;
        height: 2px;
        width: 14px;
      }
      &::before {
        top: 3px;
        left: 9px;
        height: 14px;
        width: 2px;
      }
    }
  `,
  List: styled(List)`
    span {
      display: block;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      ${media.laptop} {
        max-width: 550px;
      }
      ${media.tablet} {
        max-width: 450px;
      }
      ${media.mobile} {
        max-width: 350px;
      }
      ${media.sMobile} {
        max-width: 200px;
      }
      ${media.media(360)} {
        max-width: 150px;
      }
    }

    li {
      line-height: 1.2;
    }
  `,
};
