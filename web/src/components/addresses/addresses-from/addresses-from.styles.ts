import styled from 'styled-components';

import { media } from '@styles/media';

export const StyledAddressesForm = {
  Wrapper: styled.div`
    max-width: 550px;
    margin: 24px auto;

    h3 {
      margin-bottom: 16px;
    }

    button {
      margin-top: 20px;
    }
  `,

  AddressesList: styled.ul`
    li {
      padding: 18px 0;
      border-bottom: 1px solid rgba(33, 33, 33, 0.08);
      label {
        max-width: 500px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        ${media.tablet} {
          max-width: 450px;
        }
        ${media.mobile} {
          max-width: 400px;
        }
        ${media.sMobile} {
          max-width: 200px;
        }
        ${media.xsMobile} {
          max-width: 200px;
        }
      }
    }
  `,
};
