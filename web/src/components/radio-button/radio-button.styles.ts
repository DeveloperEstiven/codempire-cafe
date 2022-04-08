import styled from 'styled-components';

export const StyledRadio = {
  Input: styled.input`
    &[type='radio'] {
      display: none;
    }
    &[type='radio']:checked + label::before {
      border-color: #000;
    }
    &[type='radio']:checked + label::after {
      transform: translateY(-50%) scale(0.55);
    }
  `,

  Label: styled.label`
    cursor: pointer;
    position: relative;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.25px;
    padding-left: 28px;
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: transparent;
      border: 2px solid #fff;
      border-radius: 50%;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      transition: border-color 400ms ease;
    }
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #000;
      border-radius: 50%;
      top: 50%;
      left: 0;
      transform: translateY(-50%) scale(0);
      transition: transform 400ms ease;
    }
  `,
};
