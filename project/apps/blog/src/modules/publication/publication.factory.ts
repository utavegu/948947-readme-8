import { Injectable } from '@nestjs/common';
import { IAuthUser, IEntityFactory } from '@project/core';
import { PublicationEntity } from './publication.entity';
import { IPublication } from './typespaces/publication.interface';

@Injectable()
export class PublicationFactory implements IEntityFactory<PublicationEntity> {
  public create(entityPlainData: IPublication): PublicationEntity {
    return new PublicationEntity(entityPlainData);
  }
}
