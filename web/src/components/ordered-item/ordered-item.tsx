import { IOrderedItemProps } from './ordered-item.typings';

export const OrderedItem: React.FC<IOrderedItemProps> = ({ item, count }) => {
  return (
    <li key={item.name}>
      <div>
        <h4>
          {item.name} {count > 1 && <i>&times; {count}</i>}{' '}
        </h4>
        <span>{item.description}</span>
      </div>
      <span>{item.price * count} uah</span>
    </li>
  );
};
