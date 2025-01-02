export { BaseEntity } from './lib/base/entity';

export { UserRoleEnum } from './lib/types/user-role.enum';
export { IUser, IAuthUser } from './lib/types/user.interface';
export { IStorableEntity } from './lib/types/storable-entity.interface';
export { IEntityFactory } from './lib/types/entity-factory.interface';
export { IComment } from './lib/types/comment.interface';
export { ICategory } from './lib/types/category.interface';
export { IPost } from './lib/types/post.interface';
export { SortDirection } from './lib/types/sort-direction.interface';
export { PaginationResult } from './lib/types/pagination.interface';
export { Token } from './lib/types/token.interface';
export { TokenPayload } from './lib/types/token-payload.interface';

export {
  SALT_ROUNDS,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  AuthenticationValidateMessage,
} from './lib/constants';

// TODO: В своих проектах в модулях сваггера такой же приём используй, чтобы импортить всё из одного файла в контроллер
