export const getFormattedDate = (date: string) => {
  const timestamp = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toDateString();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString();
  const orderDate = timestamp.toDateString();

  let day = '';
  if (orderDate === yesterday) {
    day = 'yesterday, ';
  } else if (orderDate === today) {
    day = 'today, ';
  }
  return `${day && day}${getDate(date)}`;
};

const transform = (unit: number) => `${unit < 10 ? `0${unit}` : unit}`;

export const getTime = (date: string) => {
  const d = new Date(date);
  const minutes = transform(d.getMinutes());
  const hours = transform(d.getHours());
  return `${hours}:${minutes}`;
};

export const getDate = (date: string) => {
  const d = new Date(date);
  const day = transform(d.getDate());
  const month = transform(d.getMonth() + 1);
  const year = transform(d.getFullYear());
  return `${day}/${month}/${year}`;
};
