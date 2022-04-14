import Drawer from 'react-modern-drawer';
import styled from 'styled-components';

export const StyledFiltersDrawer = {
  Drawer: styled(Drawer)`
    padding: 16px;
    overflow-y: auto;
    .simplebar-content {
      height: 100%;
    }
  `,
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `,
  Header: styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.1px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(33, 33, 33, 0.08);
    svg {
      margin-right: 16px;
    }
  `,
};
