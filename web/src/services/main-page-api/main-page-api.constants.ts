import { IPaginateBody } from 'typings/api';

export const getFilterUrl = (baseUrl: string, { filter, queries }: IPaginateBody) => {
  const subcategories = filter.subcategories?.join(',') || '';
  const field = filter.sort.field || '';
  const order = filter.sort.order || '';
  return {
    url: `${baseUrl}?page=${queries.page}&limit=${queries.limit || 10}&term=${
      filter.term
    }&subcategories=${subcategories}&field=${field}&order=${order}`,
  };
};
