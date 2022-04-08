import { ReactComponent as borderedStar } from '@assets/icons/bordered-star.svg';
import { ReactComponent as filledStar } from '@assets/icons/filled-star.svg';
import { ReactComponent as halfStar } from '@assets/icons/half-star.svg';
import { ReactComponent as loader } from '@assets/icons/loader.svg';
import { ReactComponent as rangeChecked } from '@assets/icons/range-checked.svg';
import { ReactComponent as removeItem } from '@assets/icons/remove-item.svg';
import { ReactComponent as visibilityOff } from '@assets/icons/visibility-off.svg';
import { ReactComponent as visibility } from '@assets/icons/visibility.svg';

const ICONS = {
  borderedStar,
  filledStar,
  halfStar,
  rangeChecked,
  removeItem,
  visibility,
  visibilityOff,
  loader,
};

type TIcon = keyof typeof ICONS;

export const Icon = (props: { type: TIcon }) => {
  const NewIcon = ICONS[props.type];
  return <NewIcon />;
};
