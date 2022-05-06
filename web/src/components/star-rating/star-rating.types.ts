import { SyntheticEvent } from 'react';

export interface IStarRatingProps {
  onRatingClick?: (event: SyntheticEvent<Element, Event>, value: number | null) => void;
  value?: number | null;
  isReadonly?: boolean;
}
