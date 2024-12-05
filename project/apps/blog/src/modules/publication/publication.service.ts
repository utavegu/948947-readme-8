import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './typespaces/dto/create-publication.dto';
import { PublicationEntity } from './publication.entity';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository
  ) { }

  public async createPublication(dto: CreatePublicationDto) {
    // TODO: Проверить условия уникальности
    const publication = {
      ...dto,
      createDate: new Date()
    };

    const publicationEntity = new PublicationEntity(publication)

    this.publicationRepository.save(publicationEntity);

    return publicationEntity;
  }
}
