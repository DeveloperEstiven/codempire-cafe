import styled from 'styled-components';

export const StyledNotFound = {
  NotFound: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 50px;
    text-align: center;
    font-weight: 500;
    font-size: 24px;

    div {
      margin-bottom: 20px;
    }

    a {
      position: relative;
      padding-left: 15px;
      font-size: 16px;
      color: ${(props) => props.theme.colors.textPrimary};
      transition: color ${(prop) => prop.theme.transition} ease 0s;

      &:hover {
        color: black;
      }
      &:hover::before {
        border-color: black;
      }
      &:hover::after {
        background: black;
      }
      &::before {
        content: '';
        border-color: ${(props) => props.theme.colors.textPrimary};
        border-style: solid;
        border-width: 0 0 2px 2px;
        display: block;
        height: 7px;
        left: 0px;
        position: absolute;
        width: 7px;
        margin-top: -3px;
        top: 50%;
        transition: left 0.1s;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        transition: border-color ${(prop) => prop.theme.transition} ease 0s;
      }
      &::after {
        background-color: ${(props) => props.theme.colors.textPrimary};
        content: '';
        transition: background-color ${(prop) => prop.theme.transition} ease 0s;
        display: block;
        margin-top: -0.5px;
        height: 2px;
        left: 0px;
        position: absolute;
        top: 50%;
        width: 11px;
        transition: left 0.1s;
      }
    }
  `,
};
