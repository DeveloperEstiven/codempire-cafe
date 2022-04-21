import styled from 'styled-components';

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
    }
  `,
};
