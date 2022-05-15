import { IDropdownData } from '@components/dropdown/dropdown.typings';

interface IBase {
  name: string;
}

export const transformToDropdownData = <T extends IBase>(iterator: T[]): IDropdownData[] =>
  iterator.map(({ name }) => ({
    label: name,
    value: name,
  }));
