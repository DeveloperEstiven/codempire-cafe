import styled from 'styled-components';

export const StyledField = {
  Field: styled.div`
    width: 100%;
    height: 100%;
    text-align: left;
  `,

  Error: styled.span`
    font-size: 12px;
    margin-left: 16px;
    color: ${(props) => props.theme.colors.textDanger};
  `,
};
