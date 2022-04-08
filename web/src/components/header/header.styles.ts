import styled from 'styled-components';

export const StyledHeader = styled.header`
  height: 56px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.bg};
`;
