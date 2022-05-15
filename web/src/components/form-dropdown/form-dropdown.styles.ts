import styled from 'styled-components';

export const StyledFormDropdown = {
  Error: styled.div`
    margin-top: 4px;
    font-size: 12px;
    margin-left: 16px;
    color: ${(props) => props.theme.colors.textDanger};
  `,
  Title: styled.h3`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
  `,
};
