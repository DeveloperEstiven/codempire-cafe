import styled from 'styled-components';

import { SectionHeader } from '@screens/profile-page/profile-page.styles';

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
};
