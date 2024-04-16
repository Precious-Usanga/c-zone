import { Roles } from "../../core/enum/role";
import { IUser } from "../models/auth.model";

export const USERS: IUser[] = [
  {
    fullname: 'Admin User',
    email: 'admin.user@yopmail.com',
    password: 'password',
    role: Roles.ADMIN
  },
  {
    fullname: 'Operator User',
    email: 'operator.user@yopmail.com',
    password: 'password',
    role: Roles.OPERATOR
  }
];
