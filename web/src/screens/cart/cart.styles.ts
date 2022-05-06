import styled from 'styled-components';

export const StyledCart = {
  Cart: styled.div`
    max-width: 450px;
    margin: 0 auto;
  `,

  Wrapper: styled.div`
    overflow-y: scroll;
    margin-top: 30px;
    height: 79vh;
  `,

  Footer: styled.div`
    padding-top: 16px;
    p {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
    }

    span {
      font-weight: 400;
      font-size: 34px;
      line-height: 36px;
      color: #000000;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
};
