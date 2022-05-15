import styled from 'styled-components';

import { Button } from '@styles/components/button';
import { Form } from '@styles/components/form';
import { media } from '@styles/media';

export const StyledEditItem = {
  Form: styled(Form)`
    width: 600px;
    ${media.tablet} {
      width: 400px;
    }
    ${media.mobile} {
      width: 350px;
    }
    ${media.sMobile} {
      width: 270px;
    }

    margin: 0 auto;
    position: absolute;
    left: calc(50% + 35px);
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    h3 {
      margin-bottom: 8px;
      font-weight: 500;
      color: #000000de;
    }
  `,

  Wrapper: styled.div`
    padding: 16px;
    width: 100%;
    max-height: 410px;
    overflow-y: scroll;
  `,

  Error: styled.div`
    margin-top: 4px;
    font-size: 12px;
    margin-left: 16px;
    color: ${(props) => props.theme.colors.textDanger};
  `,

  Logo: styled.div`
    img {
      width: 130px;
      height: 130px;
      margin-bottom: 10px;
      object-fit: cover;
    }

    button {
      width: 130px;
      color: ${(props) => props.theme.colors.textPrimary};
      &:hover {
        background-color: #eee !important;
        color: ${(props) => props.theme.colors.textPrimary} !important;
      }
    }
  `,

  Header: styled.h2`
    font-size: 18px;
    font-weight: 500;
    box-shadow: ${(props) => props.theme.boxShadow};
    text-align: center;
    z-index: 1000;
    width: 100%;
    padding: 16px;
  `,

  Categories: styled.div`
    label {
      margin-top: 10px;
      display: block;
    }
  `,

  TitleWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  AddSubcategory: styled.i<{ isActive?: boolean }>`
    position: relative;
    display: block;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    margin-bottom: 8px;
    transition: background-color ${(prop) => prop.theme.transition} ease 0s;
    &:hover {
      background-color: #eee;
    }

    &::after,
    &::before {
      content: '';
      transition: transform ${(prop) => prop.theme.transition} ease 0s,
        opacity ${(prop) => prop.theme.transition} ease 0s;
      position: absolute;
      display: block;
      background-color: #000;
      top: 9px;
      left: 3px;
      height: 2px;
      width: 14px;
    }
    &::before {
      top: 3px;
      left: 9px;
      height: 14px;
      opacity: ${(props) => (props.isActive ? '0' : '1')};
      transform: rotate(${(props) => (props.isActive ? '90deg' : '0deg')});
      width: 2px;
    }
  `,

  ButtonWrapper: styled.div`
    padding: 16px;
    box-shadow: ${(props) => props.theme.boxShadow};
    z-index: 1000;
    width: 100%;
  `,

  Button: styled(Button)`
    margin-top: 16px;
    color: ${(props) => props.theme.colors.textDanger};
    &:hover {
      background-color: #eee !important;
      color: ${(props) => props.theme.colors.textDanger} !important;
    }
  `,
};
