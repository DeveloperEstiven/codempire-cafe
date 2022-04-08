import styled from 'styled-components';

interface ISpaceProps {
  gapSize?: number;
  direction?: 'vertical' | 'horizontal';
}

export const Space = styled.div<ISpaceProps>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.gapSize ? 'none' : 'flex-between')};
  flex-direction: ${(props) => (props.direction === 'horizontal' ? 'row' : 'column')};
  gap: ${(props) => (props.gapSize ? props.gapSize + 'px' : '20px')};
`;
