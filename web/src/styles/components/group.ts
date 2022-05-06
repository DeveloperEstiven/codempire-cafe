import styled from 'styled-components';

export const Group = {
  Card: styled.div`
    box-shadow: ${(props) => props.theme.boxShadow};
    margin: 16px 0;
    h3 {
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.1px;
      padding-bottom: 16px;
      padding: 16px;
    }
  `,

  Item: styled.li`
    position: relative;
    cursor: pointer;
    padding: 16px 32px;
    border-top: 1px solid rgba(33, 33, 33, 0.08);

    &:hover::before {
      transform: scale(130%) rotate(45deg) translateX(-50%);
    }
    &:hover {
      background-color: #efefef;
    }

    &::before {
      content: '';
      transition: transform ${(prop) => prop.theme.transition} ease 0s;
      position: absolute;
      top: 50%;
      right: 24px;
      display: inline-block;
      width: 8.4px;
      height: 8.4px;
      border-right: 2px solid black;
      border-top: 2px solid black;
      transform: rotate(45deg) translateX(-50%);
    }
  `,
};
