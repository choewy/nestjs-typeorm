import { ApiResponseProperty } from '@nestjs/swagger';

import { User } from '../entities';

export class UserDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  constructor(user: User) {
    this.id = user.id;
  }
}
