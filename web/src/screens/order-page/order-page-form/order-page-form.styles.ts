import styled from 'styled-components';

import { makeStyles } from '@material-ui/styles';
import { theme } from '@styles/theme';

export const StyledOrderPage = {
  Wrapper: styled.div`
    width: 100%;
    h3 {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.15px;
      display: inline-block;
      margin-bottom: 8px;
    }
  `,

  ChooseDate: styled.div`
    display: flex;
    flex-direction: column;

    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.15px;
    }
  `,

  Error: styled.div`
    margin-top: 10px;
    font-size: 12px;
    margin-left: 16px;
    color: ${(props) => props.theme.colors.textDanger};
  `,

  DateSelect: styled.div`
    display: flex;
    gap: 20px;
    & > * {
      width: 50%;
    }
  `,

  AddAddresses: styled.div`
    margin: 22px 0;
    justify-content: flex-end;
    display: flex;
    gap: 20px;
    a {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.textPrimary};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 1.25px;
      transition: color ${(prop) => prop.theme.transition} ease 0s;
      &:hover,
      &:hover i {
        color: ${(props) => props.theme.colors.text};
        &::after,
        &::before {
          transform: scale(120%);
          background-color: ${(props) => props.theme.colors.text};
        }
      }
    }

    i {
      margin-top: -1px;
      margin-left: 13px;
      &::after,
      &::before {
        transition: background-color ${(prop) => prop.theme.transition} ease 0s;
        background-color: ${(props) => props.theme.colors.textPrimary};
      }
    }
  `,

  IconCollapse: styled.div`
    height: 10px;
    width: 10px;
    display: flex;
    align-items: center;
    padding-top: 2px;
  `,
};

export const useStylesTextField = makeStyles(() => ({
  root: {
    boxShadow: theme.boxShadow,
    borderRadius: '4px',
    '& input': {
      color: 'black',
      fontSize: 14,
      fontWeight: 500,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderStyle: 'none',
    },
  },
}));
