import { DailyOrder } from '@components/daily-order';
import { TypeSelector } from '@components/type-selector';
import { useOrdersPage } from './orders-page.state';

//FIXME
const days = [
  {
    timestamp: 312342131231,
    orders: [
      {
        orderNumber: 1843,
        time: '10:05',
        description: 'Some salad, some soup and other in two lines..',
      },
      {
        orderNumber: 1842,
        time: '10:04',
        description: 'Some salad, some soup and other in two linesSome salad, some soup and other in two lines..',
      },
      {
        orderNumber: 1841,
        time: '10:03',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rerum, accusantium accusamus pariatur nulla ea consequuntur amet aliquid cumque! Animi odit quidem sequi neque temporibus nulla dolorum sunt doloremque voluptatum.',
      },
    ],
  },
  {
    timestamp: 31234213123132,
    orders: [
      {
        orderNumber: 1840,
        time: '10:05',
        description: 'Some salad, some soup and other in two lines..',
      },
      {
        orderNumber: 1839,
        time: '10:04',
        description: 'Some salad, some soup and other in two linesSome salad, some soup and other in two lines..',
      },
      {
        orderNumber: 1838,
        time: '10:03',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rerum, accusantium accusamus pariatur nulla ea consequuntur amet aliquid cumque! Animi odit quidem sequi neque temporibus nulla dolorum sunt doloremque voluptatum.',
      },
      {
        orderNumber: 1837,
        time: '10:03',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rerum, accusantium accusamus pariatur nulla ea consequuntur amet aliquid cumque! Animi odit quidem sequi neque temporibus nulla dolorum sunt doloremque voluptatum.',
      },
    ],
  },
];

//FIXME
const expectedOrders = [
  {
    timestamp: 31234213123132,
    orders: [
      {
        orderNumber: 1840,
        time: '10:05',
        description: 'Some salad, some soup and other in two lines..',
      },
      {
        orderNumber: 1839,
        time: '10:04',
        description: 'Some salad, some soup and other in two linesSome salad, some soup and other in two lines..',
      },
      {
        orderNumber: 1838,
        time: '10:03',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rerum, accusantium accusamus pariatur nulla ea consequuntur amet aliquid cumque! Animi odit quidem sequi neque temporibus nulla dolorum sunt doloremque voluptatum.',
      },
      {
        orderNumber: 1837,
        time: '10:03',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rerum, accusantium accusamus pariatur nulla ea consequuntur amet aliquid cumque! Animi odit quidem sequi neque temporibus nulla dolorum sunt doloremque voluptatum.',
      },
    ],
  },
];

export const OrdersPage: React.FC = () => {
  const { selectedType, onTypeSelect } = useOrdersPage();

  return (
    <>
      <TypeSelector titles={['waiting', 'complete']} onTypeSelect={onTypeSelect} selectedType={selectedType} />

      {selectedType === 'complete' &&
        days.map((day) => <DailyOrder key={day.timestamp} day={day.timestamp} orders={day.orders} />)}

      {selectedType === 'waiting' &&
        expectedOrders.map((day) => <DailyOrder key={day.timestamp} day={day.timestamp} orders={day.orders} />)}
    </>
  );
};
