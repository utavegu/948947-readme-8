import { UserRoleEnum } from './user-role.enum';

export interface IUser {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  role: UserRoleEnum;
}

export interface IAuthUser extends IUser {
  passwordHash: string;
}
