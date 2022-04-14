import { ReactComponent as borderedStar } from '@assets/icons/bordered-star.svg';
import { ReactComponent as cart } from '@assets/icons/cart.svg';
import { ReactComponent as filledStar } from '@assets/icons/filled-star.svg';
import { ReactComponent as filter } from '@assets/icons/filter.svg';
import { ReactComponent as halfStar } from '@assets/icons/half-star.svg';
import { ReactComponent as loader } from '@assets/icons/loader.svg';
import { ReactComponent as main } from '@assets/icons/main.svg';
import { ReactComponent as notification } from '@assets/icons/notification.svg';
import { ReactComponent as orders } from '@assets/icons/orders.svg';
import { ReactComponent as profile } from '@assets/icons/profile.svg';
import { ReactComponent as rangeChecked } from '@assets/icons/range-checked.svg';
import { ReactComponent as removeItem } from '@assets/icons/remove-item.svg';
import { ReactComponent as search } from '@assets/icons/search.svg';
import { ReactComponent as sorting } from '@assets/icons/sorting.svg';
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
  main,
  notification,
  orders,
  profile,
  cart,
  search,
  filter,
  sorting,
};

export type TIcon = keyof typeof ICONS;

export const Icon = (props: { type: TIcon }) => {
  const NewIcon = ICONS[props.type];
  return <NewIcon />;
};
