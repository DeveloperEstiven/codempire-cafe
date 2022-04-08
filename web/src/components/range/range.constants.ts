import { IRangeStatus } from './range.typings';

export const rangeInitialStatus = ['created', 'ready', 'on way', 'delivered'];

export const getStatusData = (initialStatus: string[], receivedStatus: string[]) => {
  const currentStatus: IRangeStatus = {};
  const finished = receivedStatus.length;
  initialStatus.forEach((status, index) => {
    currentStatus[status] = status === receivedStatus[index] ? true : false;
  });
  return { currentStatus, percent: (finished - 1) * (100 / (initialStatus.length - 1)) };
};
