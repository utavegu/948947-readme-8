import { Injectable } from '@nestjs/common';
import { IAuthUser, IEntityFactory } from '@project/core';
import { UserEntity } from './user.entity';

@Injectable()
export class UserFactory implements IEntityFactory<UserEntity> {
  public create(entityPlainData: IAuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
