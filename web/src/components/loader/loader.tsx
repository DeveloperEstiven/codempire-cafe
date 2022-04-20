import { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

import { Icon } from '@components/icon';
import { CenteredLoader } from './loader.styles';
import { ILoaderProps } from './loader.typings';

export const Loader: React.FC<ILoaderProps> = ({ area, children, isWithoutArea }) => {
  const { promiseInProgress } = usePromiseTracker({ area });
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setIsShown(true), 200);
    return () => clearTimeout(delay);
  }, []);

  if (!promiseInProgress && !isWithoutArea) {
    return <>{children}</>;
  }
  return <CenteredLoader>{isShown && <Icon type="loader" />}</CenteredLoader>;
};
