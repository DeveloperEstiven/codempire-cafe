import { Icon } from '@components/icon';

import { IChipProps } from './chip.typings';

import { ChipBox } from './chip.styles';

export const Chip: React.FC<IChipProps> = ({ label, id, selected, setSelected }) => {
  const handleDelete = (id: number) => {
    if (Array.isArray(selected)) {
      const rest = selected.filter((el) => el.id !== id);
      setSelected(rest);
    }
  };

  return (
    <ChipBox>
      <span>{label}</span>
      <div onClick={() => handleDelete(id)}>
        <Icon type="removeItem" />
      </div>
    </ChipBox>
  );
};
