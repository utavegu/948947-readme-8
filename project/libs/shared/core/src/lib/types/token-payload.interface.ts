import { UserRoleEnum } from './user-role.enum';

/*
Описывает полезную нагрузку, которую мы будем размещать в токене:

* sub — идентификатор пользователя;
* email — адрес электронной почты;
* role — роль пользователя;
* lastname — фамилия пользователя;
* firstname —  имя пользователя;
*/

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRoleEnum;
  lastname: string;
  firstname: string;
}
