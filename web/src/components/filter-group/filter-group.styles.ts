import styled from 'styled-components';

export const StyledFilterGroup = {
  Group: styled.section`
    margin-top: 24px;
    h3 {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: #000000;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(33, 33, 33, 0.08);
    }

    ul {
      margin-top: 10px;
      display: flex;

      flex-wrap: wrap;
      li {
        width: 100%;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `,
};
