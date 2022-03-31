import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.body}; 
    font-family: ${(props) => props.theme.font};
    font-size: ${(props) => props.theme.fontSize};
    font-weight: ${(props) => props.theme.fontWeight};
    transition: color ${(props) => props.theme.transition} linear;
    transition: background-color ${(props) => props.theme.transition} linear;
  }
`;
