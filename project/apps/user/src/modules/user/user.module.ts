import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFactory
  ],
  exports: [UserRepository],
})
export class UserModule { }
