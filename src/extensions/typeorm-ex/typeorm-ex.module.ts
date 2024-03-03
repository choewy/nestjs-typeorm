import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TypeOrmExModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 33061,
          username: 'root',
          database: 'temp',
          synchronize: true,
          entities: ['./dist/**/*.entity.{ts,js}'],
        }),
      ],
      module: TypeOrmExModule,
    };
  }
}
