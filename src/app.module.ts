import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmExModule } from '@extensions';

@Module({
  imports: [TypeOrmExModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
