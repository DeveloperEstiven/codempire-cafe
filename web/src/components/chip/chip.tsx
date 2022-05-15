import { Icon } from '@components/icon';
import { ChipBox } from './chip.styles';
import { IChipProps } from './chip.typings';

export const Chip: React.FC<IChipProps> = ({ value, selected, setSelected }) => {
  const removeItem = (value: string) => {
    if (Array.isArray(selected)) {
      const rest = selected.filter((el) => el.value !== value);
      setSelected(rest);
    }
  };

  const handleDelete = (value: string) => () => removeItem(value);
  return (
    <ChipBox onClick={handleDelete(value)}>
      <span>{value}</span>
      <div>
        <Icon type="removeItem" />
      </div>
    </ChipBox>
  );
};
