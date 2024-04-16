import { IUser } from "@auth/models/auth.model";
import { Roles } from "@core/enum/role";


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
