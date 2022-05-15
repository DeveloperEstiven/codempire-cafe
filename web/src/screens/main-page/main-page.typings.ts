export type TSelectedType = 'product' | 'menu';

export interface IMainPageState {
  state?: {
    tab: TSelectedType;
  };
}
