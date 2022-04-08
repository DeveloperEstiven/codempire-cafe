import styled, { css } from 'styled-components';

import { ILabelProps } from './input.typings';

export const StyledInput = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 16px;
  `,
  Icon: styled.div`
    cursor: pointer;
    position: absolute;
    bottom: 13px;
    right: 16px;
    user-select: none;
  `,
  Block: styled.div`
    input {
      width: 100%;
      height: 100%;
      height: 54px;
      border: none;
      outline: none;
      padding: 16px;
    }
  `,
  Input: styled.input`
    &[type='password'] {
      font-family: ${(props) => props.theme.passwordFont};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `,
  Label: styled.label<ILabelProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border: 1px solid ${(props) => (props.$isFocus ? '#000' : '#dadada')};
    border-radius: ${(props) => props.theme.borderRadius};
    font-size: ${(props) => (props.$isTitle ? '0px' : '16px')};

    span {
      position: absolute;
      bottom: 16px;
      padding: 0 6px;
      background: #fff;
      left: 15px;
      transition: transform 0.1s ease;

      ${(props) =>
        !props.$isTitle &&
        (props.$isFocus || props.$isValue) &&
        css`
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 51%,
            rgba(230, 230, 230, 0) 51%,
            rgba(0, 0, 0, 0) 100%
          );
          transform: translate(-5px, -250%);
          font-size: 12px;
          letter-spacing: 0.4px;
          opacity: ${!props.$isFocus && props.$isValue ? '0' : '1'};
        `}
      ${(props) =>
        props.$isTitle &&
        (props.$isFocus || props.$isValue) &&
        css`
          opacity: 0;
        `}
    }
  `,
  Title: styled.h3`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.15px;
  `,

  TextArea: styled.textarea`
    resize: none;
    width: 100%;
    padding: 16px;
    height: 94px;
    font-size: 16px;
  `,
};
