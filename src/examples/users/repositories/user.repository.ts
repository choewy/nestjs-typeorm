import { User } from '../entities';

import { InjectableRepository, ExtendsRepository, OnTransaction } from '@extensions/typeorm-ex';

import { UserTransaction } from './enums';

@InjectableRepository(User)
export class UserRepository extends ExtendsRepository<User> {
  async createDefault(): Promise<User> {
    const user = this.create();
    await this.insert(user);
    return user;
  }

  @OnTransaction(UserTransaction.ExistsById)
  async existsById(id: number): Promise<boolean> {
    return this.existsBy({ id });
  }

  @OnTransaction(UserTransaction.FindById)
  async findById(id: number, pessimisticWriteLock?: boolean): Promise<User | null> {
    return this.findOne({
      where: { id },
      lock: pessimisticWriteLock ? { mode: 'pessimistic_write' } : undefined,
    });
  }
}
