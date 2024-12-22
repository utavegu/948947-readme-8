import { PrismaClientService } from '@project/models';
import { BaseEntity, IStorableEntity, IEntityFactory } from '@project/core';
import { IBaseRepository } from './base-repository.interface';

export abstract class BasePostgresRepository<
T extends BaseEntity & IStorableEntity<ReturnType<T['toPOJO']>>,
DocumentType = ReturnType<T['toPOJO']>
> implements IBaseRepository<T> {

  constructor(
    protected entityFactory: IEntityFactory<T>,
    protected readonly client: PrismaClientService,
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (! document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented');
  }

  public async save(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }

  public async update(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
