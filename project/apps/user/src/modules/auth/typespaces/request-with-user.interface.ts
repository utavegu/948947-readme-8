import { UserEntity } from "../../user/user.entity";

export interface RequestWithUser {
  user?: UserEntity;
}
