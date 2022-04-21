import styled from 'styled-components';

import { Form } from '@styles/components/form';

export const StyledChangePasswordForm = {
  Form: styled(Form)`
    height: 100%;
    display: block;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;

    h3 {
      margin-bottom: 10px;
    }
  `,
};
