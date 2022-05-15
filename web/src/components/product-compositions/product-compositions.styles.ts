import styled from 'styled-components';

import { PlusButton } from '@styles/components/plus-button';

export const StyledProductCompositions = {
  Wrapper: styled.div`
    width: 400px;
    margin: 0 auto;
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    th,
    td {
      white-space: nowrap;
    }

    th {
      &:last-child {
        width: 47px;
      }
    }

    td {
      &:last-child {
        width: 40px;
      }
    }

    thead,
    tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    tbody {
      display: block;
      width: 100%;
      overflow: auto;
      height: calc(100vh - 68px);
      padding-bottom: 10px;
    }
  `,

  Header: styled.th`
    padding: 16px 0;
    text-align: left;
    font-weight: 500;
    position: sticky;
    top: 0px;
    background-color: #fff;
    box-shadow: ${(props) => props.theme.boxShadow};
    z-index: 300;
    box-shadow: inset 0 0 0 #000000, inset 0 -1px 0 rgba(33, 33, 33, 0.08);
  `,

  Row: styled.tr`
    border-bottom: 1px solid rgba(33, 33, 33, 0.08);

    td {
      padding: 16px 0;
    }

    td label {
      display: none;
    }
  `,

  RemoveIngredient: styled(PlusButton)`
    padding-right: 0;
    &::before {
      top: 9px;
      left: 3px;
      height: 2px;
      width: 14px;
    }
  `,

  ButtonWrapper: styled.div`
    padding: 16px 0;
  `,
};
