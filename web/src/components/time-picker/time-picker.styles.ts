import styled from 'styled-components';

export const StyledTimePicker = {
  TimePicker: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: ${(props) => props.theme.boxShadow};
    height: 53px;
    span {
      width: 37px;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0.1px;
    }
    button {
      position: relative;
      background-color: #fff;
      border: 0;
      cursor: pointer;

      &::before {
        transition: transform 0.3s ease 0s;
        position: absolute;
        left: 22px;
        top: -4.2px;
        display: block;
        content: '';
        width: 8.4px;
        height: 8.4px;
        border-right: 2px solid black;
        border-top: 2px solid black;
        transform: rotate(-135deg);
      }

      &:last-child {
        &::before {
          left: -28px;
          transform: rotate(45deg);
        }
      }
    }
  `,
};
