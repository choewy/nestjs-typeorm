import { DynamicModule, FactoryProvider, Module, Type } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { createExtendsRepositoryProvider, TransactionManager } from './providers';
import { ExtendsRepository } from './abstracts';

@Module({})
export class TypeOrmExModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return {
      imports: [EventEmitterModule.forRoot(), TypeOrmModule.forRoot(options)],
      providers: [TransactionManager],
      exports: [TransactionManager],
      module: TypeOrmExModule,
    };
  }

  static forRootAsync(options?: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      imports: [EventEmitterModule.forRoot(), TypeOrmModule.forRootAsync(options)],
      providers: [TransactionManager],
      exports: [TransactionManager],
      module: TypeOrmExModule,
    };
  }

  static forFeature(IRepositories: Type<ExtendsRepository<any>>[]): DynamicModule {
    const providers: (FactoryProvider | Type<any>)[] = [TransactionManager];

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
