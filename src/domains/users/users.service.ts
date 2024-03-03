import { Injectable } from '@nestjs/common';

import { UserRepository } from './repositories';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
}
