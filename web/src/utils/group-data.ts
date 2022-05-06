import { getFormattedDate } from './date';

type TPlain = { date: string }[];
type TObj = {
  [key: string]: { date: string }[];
};

export const getGroups = <T extends TObj>(items: T) => {
  const key = Object.keys(items)[0];

  const groups: TObj = items[key as keyof T].reduce((group: TObj, item) => {
    const date = getFormattedDate(item.date);
    if (!group[date]) group[date] = [];
    group[date].push(item);
    return group;
  }, {});

  return Object.keys(groups).map((date) => ({
    date,
    [key]: groups[date] as TPlain,
  }));
};
