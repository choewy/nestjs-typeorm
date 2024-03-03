import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories';
import { TypeOrmExModule } from '@extensions/typeorm-ex';

@Module({
  imports: [TypeOrmExModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
