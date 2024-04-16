import { Roles } from "@core/enum/role";


export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ILoggedInResponse {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  role: Roles;
}
