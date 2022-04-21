export interface IStarRatingProps {
  onRatingClick: (rating: number) => void;
  fractions?: number;
  value?: number;
}
