const
  SALT_ROUNDS = 10,
  AUTH_USER_EXISTS = 'User with this email exists',
  AUTH_USER_NOT_FOUND = 'User not found',
  AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export {
  SALT_ROUNDS,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
}

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  DateBirthNotValid: 'The user date birth is not valid',
} as const;

/*
TODO: лучше переделай в таком стиле:
export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;
*/
