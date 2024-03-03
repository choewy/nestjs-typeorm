import { ExtendsRepository, InjectableRepository } from '@extensions/typeorm-ex';

import { ArticleInformation } from '../entities';

@InjectableRepository(ArticleInformation)
export class ArticleInformationRepository extends ExtendsRepository<ArticleInformation> {}
