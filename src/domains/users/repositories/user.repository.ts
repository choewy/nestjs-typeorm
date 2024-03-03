import { User } from '../entities';

import { InjectableRepository, ExtendsRepository } from '@extensions/typeorm-ex';

@InjectableRepository(User)
export class UserRepository extends ExtendsRepository<User> {
  async findUsers() {
    return this.transaction(async (em) => {
      return em.getRepository(this.target).find();
    });
  }
}
