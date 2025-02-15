import { IUser, TokenPayload } from '@project/core';

export function createJWTPayload(user: IUser): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    lastname: user.lastname,
    firstname: user.firstname,
  };
}
