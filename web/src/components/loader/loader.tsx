import { usePromiseTracker } from 'react-promise-tracker';

import { Icon } from '@components/icon';

import { ILoaderProps } from './loader.typings';

import { CenteredLoader } from './loader.styles';

export const Loader: React.FC<ILoaderProps> = ({ area, children, isWithoutArea }) => {
  const { promiseInProgress } = usePromiseTracker({ area });

  if (!promiseInProgress && !isWithoutArea) {
    return <>{children}</>;
  }
  return (
    <CenteredLoader>
      <Icon type="loader" />
    </CenteredLoader>
  );
};
