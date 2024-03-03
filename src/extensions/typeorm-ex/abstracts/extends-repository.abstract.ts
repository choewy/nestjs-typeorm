import { ObjectLiteral, Repository, DataSource, EntityTarget } from 'typeorm';

import { FactoryProvider, Type } from '@nestjs/common';

import { TYPEORM_EX_INJECTABLE_REPOSITORY_ENTITY_KEY } from '../constants';

export abstract class ExtendsRepository<E extends ObjectLiteral> extends Repository<E> {
  constructor(readonly target: EntityTarget<E>, readonly dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  static createProvider(Repository: Type<any>): FactoryProvider {
    return {
      inject: [DataSource],
      provide: Repository,
      useFactory(dataSource: DataSource) {
        return new Repository(Reflect.getMetadata(TYPEORM_EX_INJECTABLE_REPOSITORY_ENTITY_KEY, Repository), dataSource);
      },
    };
  }
}
