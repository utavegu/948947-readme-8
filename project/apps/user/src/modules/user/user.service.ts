import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async getUserInfoById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return (await this.userRepository.findByEmail(email)).toPOJO();
  }
}
