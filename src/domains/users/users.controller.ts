import { Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDto } from './dtos';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get Users' })
  @ApiOkResponse({ type: [UserDto] })
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: UserDto })
  async createUser() {
    return this.usersService.createUser();
  }
}
