import styled from 'styled-components';

import { Group } from '@styles/components/group';

export const StyledDailyOrder = {
  Item: styled(Group.Item)`
    display: flex;
    height: 100%;

    & div:first-child {
      margin-right: 30px;
    }

    b {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 16px;
    }

    span {
      font-size: 12px;
      line-height: 16px;
      display: flex;
      letter-spacing: 0.4px;
      color: rgba(0, 0, 0, 0.42);
      white-space: nowrap;
    }

    p {
      padding-right: 20px;
    }

    &:hover::before {
      transform: scale(130%) rotate(45deg) translateX(-50%);
    }
    &:hover {
      background-color: #efefef;
    }
  `,
};
