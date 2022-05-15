import { IMenu, IProduct, IUser, TMenuResponse, TProductResponse } from 'typings/api';

export const transformItemsResponse = <T extends TProductResponse | TMenuResponse>(response: T): T => ({
  ...response,
  items: response.items.map((item) => ({
    ...item,
    image: transformToHTMLImage(item.image),
  })),
});

export const transformUserResponse = (user: IUser) => ({
  ...user,
  logo: transformToHTMLImage(user.logo),
});

export const transformItemResponse = <T extends IMenu | IProduct>(item: T): T => ({
  ...item,
  image: transformToHTMLImage(item.image),
});

export const transformToHTMLImage = (b64image: string) => (b64image ? `data:image/png;base64,${b64image}` : '');
