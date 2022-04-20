import { TMenuResponse, TProductResponse } from 'typings/api';

export const transformImage = <T extends TProductResponse | TMenuResponse>(response: T): T => ({
  ...response,
  items: response.items.map((item) => ({
    ...item,
    image: `data:image/png;base64,${item.image}`,
  })),
});
