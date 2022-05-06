import styled from 'styled-components';

import { Drawer } from '@styles/components/drawer';

export const StyledFiltersDrawer = {
  ButtonWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  `,

  Header: styled(Drawer.Header)`
    padding: 16px;
  `,

  Wrapper: styled(Drawer.Wrapper)`
    display: flex;
    overflow-y: auto;
    padding: 16px;
    height: 81%;
    justify-content: space-between;
    flex-direction: column;

    section:first-child {
      margin-top: 0;
    }
  `,
};
