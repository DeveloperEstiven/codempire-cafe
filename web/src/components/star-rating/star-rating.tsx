import Rating from 'react-rating';

import { Icon } from '@components/icon';
import { IStarRatingProps } from './star-rating.types';

export const StarRating: React.FC<IStarRatingProps> = ({ onRatingClick, fractions, value }) => (
  <Rating
    initialRating={value}
    emptySymbol={<Icon type="borderedStar" />}
    fullSymbol={<Icon type="filledStar" />}
    fractions={fractions || 2}
    onChange={onRatingClick}
  />
);
