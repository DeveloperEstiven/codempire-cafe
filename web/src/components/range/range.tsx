import React, { FC, useMemo } from 'react';

import { Icon } from '@components/icon';

import { getStatusData, rangeInitialStatus } from './range.constants';

import { IRangeProps } from './range.typings';

import { StyledRange as Styled } from './range.styles';

export const Range: FC<IRangeProps> = ({ status }) => {
  const { currentStatus, percent } = useMemo(() => getStatusData(rangeInitialStatus, status), [status]);
  return (
    <Styled.Centered>
      <Styled.Line percent={percent}>
        {Object.keys(currentStatus).map((key) => (
          <Styled.Circle key={key} isDone={currentStatus[key]}>
            <Icon type="rangeChecked" />
            <label>{key}</label>
          </Styled.Circle>
        ))}
      </Styled.Line>
    </Styled.Centered>
  );
};
