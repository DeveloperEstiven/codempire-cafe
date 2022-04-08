import { IUser } from 'typings/api';

export interface IUserPublic {
  email: string;
  userName: string;
  phoneNumber: string;
}

export interface IUserLogIn {
  email: string;
  password: string;
}

export interface IUserResponse {
  token: string;
  user: IUser;
}

export interface IUserSignUp extends IUserPublic {
  password: string;
}
