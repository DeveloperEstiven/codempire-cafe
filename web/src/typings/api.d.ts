import { IUserPublic } from '@services/user-api/user-api.typings';

export interface IUser extends IUserPublic {
  id: string;
  publicKey: string;
  role: TRole;
}

export interface IError {
  message?: string;
  code?: number;
}

export type TInputEvent = React.ChangeEvent<HTMLInputElement>;

export type TRole = 'user' | 'manager';
