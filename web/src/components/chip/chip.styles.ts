import styled from 'styled-components';

export const ChipBox = styled.div`
  padding: 6px 8px;
  border-radius: 16px;
  background-color: #ededed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    letter-spacing: 0.25px;
    font-size: 14px;
    white-space: nowrap;
    margin-right: 8px;
    line-height: 20px;
  }
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      transition: fill 0.2s linear;
      fill: black;
    }
    &:hover svg {
      fill: red;
    }
  }
`;
