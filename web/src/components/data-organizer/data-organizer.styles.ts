import styled from 'styled-components';

export const StyledDataOrganizer = {
  FilterWrapper: styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin: 10px 0px;
    gap: 20px;
    height: 50px;
    color: ${(props) => props.theme.colors.textPrimary};
  `,

  FilterItem: styled.div<{ isFilterApplied?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    text-transform: uppercase;
    width: 162px;
    position: relative;
    cursor: pointer;
    div {
      white-space: nowrap;
      transition: ${(props) => props.theme.transition};
      color: ${(props) => props.theme.colors.textPrimary};
    }
    svg {
      margin: 0 20px;
      fill: ${(props) => props.theme.colors.textPrimary};
      transition: fill ${(props) => props.theme.transition} ease 0s;
    }

    span {
      &::before {
        content: '';
        position: absolute;
        right: 15px;
        top: 14px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        display: block;
        display: ${(props) => (props.isFilterApplied ? 'block' : 'none')};
        background-color: ${(props) => props.theme.colors.textPrimary};
      }
    }

    transition: color ${(props) => props.theme.transition} ease 0s;
    &:hover {
      color: #000;
      svg {
        fill: #000;
      }
      div {
        color: #000;
      }
    }
  `,
};
