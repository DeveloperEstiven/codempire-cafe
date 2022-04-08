import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IUser } from 'typings/api';

export interface IUserInitialState {
  token: string;
  user: IUser;
}

export type TBuilder = ActionReducerMapBuilder<IUserInitialState>;
