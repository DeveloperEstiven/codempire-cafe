import { useState } from 'react';

import { TSelectedTypes } from './orders-page.typings';

export const useOrdersPage = () => {
  const [selectedType, setSelectedType] = useState<TSelectedTypes>('waiting');

  const onTypeSelect = (type: string) => {
    //TODO the same with main-page
    setSelectedType(type as TSelectedTypes);
  };

  return {
    selectedType,
    onTypeSelect,
  };
};
