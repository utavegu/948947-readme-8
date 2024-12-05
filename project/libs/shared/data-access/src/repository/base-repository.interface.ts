import { BaseEntity } from '@project/core';

export interface IBaseRepository<T extends BaseEntity> {
  // findAll(): Promise<T[] | null>;
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  deleteById(id: T['id']): Promise<void>;
}
