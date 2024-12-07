import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { UserModel, UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: UserModel.name,
      schema: UserSchema,
    }
  ])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFactory
  ],
  exports: [UserRepository],
})
export class UserModule { }
