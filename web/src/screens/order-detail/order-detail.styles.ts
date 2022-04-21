import styled from 'styled-components';

export const StyledOrderDetail = {
  Page: styled.div`
    margin: 0 auto;
    margin-top: 8px;
    max-width: 450px;

    h4 {
      font-weight: 500;
      letter-spacing: 0.1px;
      margin-bottom: 6px;
    }

    span {
      letter-spacing: 0.25px;
      display: block;
      margin-bottom: 16px;
    }

    button {
      margin: 30px 0;
    }
  `,
  InformationBox: styled.div`
    font-size: 14px;
    line-height: 140%;
    border-bottom: 1px solid rgba(33, 33, 33, 0.08);
    margin-top: 16px;

    h2 {
      font-size: 24px;
      line-height: 24px;
      letter-spacing: 0.18px;
      margin-bottom: 24px;
    }

    h4 {
      font-weight: 500;
      letter-spacing: 0.1px;
      margin-bottom: 6px;
    }

    span {
      letter-spacing: 0.25px;
      display: block;
      margin-bottom: 16px;
    }
  `,

  Delivered: styled.div`
    margin: 16px 0;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
        margin-bottom: 0;
      }
    }

    span {
      height: 24px;
      margin-bottom: 0;
    }
  `,
  Status: styled.div`
    margin: 16px 0;

    & div:first-child {
      display: flex;
      margin-bottom: 20px;
      h4 {
        margin: 0 0 0 15px;
      }
    }

    span {
      margin-bottom: 0;
    }
  `,
};
