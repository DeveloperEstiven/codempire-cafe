import styled from 'styled-components';

export const StyledOrderInformation = {
  Box: styled.div`
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
  Products: styled.ul`
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    i {
      font-style: normal;
    }
  `,
  TotalPrice: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
