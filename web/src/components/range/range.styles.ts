import styled, { css } from 'styled-components';

export const StyledRange = {
  Centered: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  Circle: styled.div<{ isDone: boolean }>`
    width: 12px;
    height: 12px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    z-index: 1;
    position: relative;
    top: -5px;
    transition: background-color 0.5s ease;

    label {
      position: absolute;
      left: 0;
      top: 12px;
      line-height: 16px;
      font-size: 12px;
      transform: translateX(calc(-50% + 6px));
      white-space: nowrap;
    }

    svg {
      opacity: 0;
      transition: opacity 0.5s ease;
      position: absolute;
      left: calc(50% - 4px);
      top: calc(50% - 4px);
    }

    ${(props) =>
      props.isDone &&
      css`
        background-color: #000;
        border: 1px solid #fff;
        svg {
          opacity: 1;
        }
      `}
  `,

  Line: styled.div<{ percent: number }>`
    width: 90%;
    height: 12px;
    background-color: #fff;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    height: 4px;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 4px 0 20px 0;

    &:before {
      content: '';
      display: block;
      width: ${(props) => props.percent + '%'};
      transition: width 0.5s ease-in-out;
      background-color: #000;
      height: 4px;
      position: absolute;
      top: -1px;
      left: 0;
    }

    div {
      &:first-child {
        left: -1px;
      }
      &:last-child {
        right: -1px;
      }
    }
  `,
};
