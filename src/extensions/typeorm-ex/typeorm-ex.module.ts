import { DynamicModule, FactoryProvider, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createExtendsRepositoryProvider } from './providers';
import { ExtendsRepository } from './abstracts';

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

  static forFeature(...IRepositories: Type<ExtendsRepository<any>>[]): DynamicModule {
    const providers: FactoryProvider[] = [];

    for (const IRepository of IRepositories) {
      providers.push(createExtendsRepositoryProvider(IRepository));
    }

    return {
      module: TypeOrmExModule,
      providers: providers,
      exports: providers,
    };
  }
}
