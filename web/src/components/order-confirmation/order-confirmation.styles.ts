import styled from 'styled-components';

export const StyledOrderConfirmation = {
  Page: styled.section`
    max-width: 450px;
    margin: 0 auto;
  `,

  Wrapper: styled.div`
    margin-top: 10px;
    height: 88vh;
    overflow-y: scroll;

    & + button {
      margin-top: 10px;
    }
  `,

  LoaderBox: styled.div`
    margin-top: 10px;
  `,

  OrderSuccess: styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.15px;
  `,
};
