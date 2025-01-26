import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async getUserInfoById(id: string) {
    const targetUser = await this.userRepository.findById(id)

    // так делать не надо! не привыкай. Всё красиво, внутри ту поджо
    delete targetUser.passwordHash;

    return targetUser.toPOJO();
  }

  async findByEmail(email: string) {
    const targetUser = await this.userRepository.findByEmail(email)

    return targetUser.toPOJO();
  }
}
