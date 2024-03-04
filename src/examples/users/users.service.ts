import { Injectable } from '@nestjs/common';

import { UserRepository } from './repositories';
import { UserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async createUser(): Promise<UserDto> {
    return new UserDto(await this.userRepository.createDefault());
  }
}
