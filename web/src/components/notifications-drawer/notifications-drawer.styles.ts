import styled from 'styled-components';

import { Drawer } from '@styles/components/drawer';
import { Group } from '@styles/components/group';

export const StyledNotificationsDrawer = {
  Wrapper: styled(Drawer.Wrapper)`
    height: 92%;
    overflow-y: auto;
  `,

  Header: styled(Drawer.Header)`
    padding: 16px;
    svg {
      fill: #000 !important;
    }
  `,

  NotificationItem: styled(Group.Item)<{ isRated: boolean }>`
    p {
      white-space: nowrap;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: rgba(0, 0, 0, 0.87);
    }

    span {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      color: rgba(0, 0, 0, 0.42);
    }

    &::after {
      content: '';
      transition: opacity ${(props) => props.theme.transition} ease;
      width: 8px;
      height: 8px;
      display: block;
      opacity: ${(props) => (props.isRated ? 0 : 1)};
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.textPrimary};
      position: absolute;
      left: 10px;
      top: calc(50% - 4px);
    }
  `,
};
