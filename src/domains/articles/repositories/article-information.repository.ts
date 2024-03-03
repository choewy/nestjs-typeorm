import { ExtendsRepository, InjectableRepository, OnTransaction } from '@extensions/typeorm-ex';

import { Article, ArticleInformation } from '../entities';

import { ArticleInformationTransaction } from './enums';

@InjectableRepository(ArticleInformation)
export class ArticleInformationRepository extends ExtendsRepository<ArticleInformation> {
  @OnTransaction(ArticleInformationTransaction.Post)
  async createArticleInformation(article: Article): Promise<ArticleInformation> {
    const articleInformation = this.create({ article });
    await this.insert(articleInformation);
    return articleInformation;
  }
}
