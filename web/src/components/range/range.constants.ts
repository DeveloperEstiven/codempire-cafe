import { IRangeStatus } from './range.typings';

export const rangeInitialStatus = ['created', 'ready', 'on way', 'delivered'];

export const getStatusData = (initialStatus: string[], receivedStatus: string) => {
  const currentStatus: IRangeStatus = {};
  const resStatus = rangeInitialStatus.slice(0, rangeInitialStatus.findIndex((el) => el === receivedStatus) + 1);
  const finished = resStatus.length;
  initialStatus.forEach((status, index) => {
    currentStatus[status] = status === resStatus[index] ? true : false;
  });
  return { currentStatus, percent: (finished - 1) * (100 / (initialStatus.length - 1)) };
};
