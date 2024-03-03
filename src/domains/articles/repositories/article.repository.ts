import { InjectableRepository, ExtendsRepository } from '@extensions/typeorm-ex';

import { Article } from '../entities';

@InjectableRepository(Article)
export class ArticleRepository extends ExtendsRepository<Article> {}
