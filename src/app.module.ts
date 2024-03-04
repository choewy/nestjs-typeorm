import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmExModule } from '@extensions/typeorm-ex';

import { ExamplesModule } from './examples';

@Module({
  imports: [
    TypeOrmExModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 33061,
      username: 'root',
      database: 'temp',
      synchronize: true,
      entities: ['./dist/**/*.entity.{ts,js}'],
    }),
    ExamplesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
