import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/data-access';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
// Предыдущая реализация
// export class UserRepository extends MemoryRepository<UserEntity> {
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  // Реализация для MemoryRepository
  // constructor(entityFactory: UserFactory) {
  //   super(entityFactory);
  // }
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) blogUserModel: Model<UserModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
    // Реализация для MemoryRepository
    // const entities = Array.from(this.entities.values());
    // const user = entities.find((entity) => entity.email === email);

    // if (!user) {
    //   return null;
    // }

    // return this.entityFactory.create(user);
  }
}
