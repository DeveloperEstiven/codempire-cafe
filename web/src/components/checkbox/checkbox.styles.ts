import styled from 'styled-components';

export const CheckboxWrapper = styled.div`
  display: flex;
`;

export const StyledCheckbox = styled.input<{ isReadOnly?: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 18px;
  width: 18px;
  position: relative;
  cursor: ${(props) => (props.isReadOnly ? 'default' : 'pointer')};
  border: 2px solid #131316;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  border-radius: 2px;
  &:after {
    content: '';
    display: block;
    width: 6px;
    height: 11px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    position: absolute;
    left: 4px;
    top: 0px;
    transform: rotate(60deg);
    transition: transform 0.3s ease, opacity 0.2s ease;
    opacity: 0;
  }
  &:checked {
    background: #131316;
    &::after {
      opacity: 1;
      transform: rotate(45deg);
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
    &:checked {
      border-color: #999;
    }
    & + label {
      cursor: not-allowed;
    }
  }

  & + label {
    font-size: 14px;
    line-height: 140%;
    display: inline-block;
    letter-spacing: 0.25px;
    vertical-align: top;
    cursor: ${(props) => (props.isReadOnly ? 'default' : 'pointer')};
    padding-left: 20px;
  }
`;
