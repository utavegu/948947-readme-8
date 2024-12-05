import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '@project/data-access';
import { PublicationEntity } from './publication.entity';
import { PublicationFactory } from './publication.factory';

@Injectable()
export class PublicationRepository extends MemoryRepository<PublicationEntity> {
  constructor(entityFactory: PublicationFactory) {
    super(entityFactory);
  }

  // уникальный методы публикаций
}
