import { Icon } from '@components/icon';
import { Rating } from '@mui/material';
import { IStarRatingProps } from './star-rating.types';

export const StarRating: React.FC<IStarRatingProps> = ({ onRatingClick, value, isReadonly }) => (
  <Rating
    value={value}
    readOnly={isReadonly}
    onChange={onRatingClick}
    emptyIcon={<Icon type="borderedStar" />}
    icon={<Icon type="filledStar" />}
  />
);
