import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmExModule } from '@extensions/typeorm-ex';

import { UsersModule } from '@domains/users';
import { ArticlesModule } from '@domains/articles';

@Module({
  imports: [TypeOrmExModule.forRoot(), UsersModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
