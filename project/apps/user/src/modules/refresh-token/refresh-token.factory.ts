import { Injectable } from '@nestjs/common';

import { JwtToken, IEntityFactory } from '@project/core';

import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenFactory implements IEntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: JwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
