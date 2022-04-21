

import { StyledTypeSelector as Styled } from './type-selector.styles';
import { ITypeSelectorProps } from './type-selector.typings';

export const TypeSelector: React.FC<ITypeSelectorProps> = ({ titles, selectedType, onTypeSelect }) => {
  const onSelect = (title: string) => () => onTypeSelect(`${title}`);

  return (
    <Styled.Type>
      {titles.map((title) => (
        <Styled.Item key={title} isActive={selectedType === title} onClick={onSelect(title)}>
          <span>{title}</span>
        </Styled.Item>
      ))}
    </Styled.Type>
  );
};
