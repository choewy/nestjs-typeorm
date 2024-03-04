import { ExtendsRepository, InjectableRepository, OnTransaction } from '@extensions/typeorm-ex';

import { Article, ArticleInformation } from '../entities';

import { ArticleInformationTransaction } from './enums';

@InjectableRepository(ArticleInformation)
export class ArticleInformationRepository extends ExtendsRepository<ArticleInformation> {
  @OnTransaction(ArticleInformationTransaction.FindByArticleId)
  async findByArticleId(articleId: number, pessimisticWriteLock?: boolean): Promise<ArticleInformation> {
    return this.findOne({
      where: { article: { id: articleId } },
      lock: pessimisticWriteLock ? { mode: 'pessimistic_write' } : undefined,
    });
  }

  @OnTransaction(ArticleInformationTransaction.Post)
  async createArticleInformation(article: Article): Promise<ArticleInformation> {
    const articleInformation = this.create({ article });
    await this.insert(articleInformation);

    article.information = articleInformation;

    return articleInformation;
  }

  @OnTransaction(ArticleInformationTransaction.IncreaseLikes)
  async increaseLikes(articleInformation: ArticleInformation): Promise<ArticleInformation> {
    articleInformation.likes += 1;

    await this.update(articleInformation.id, articleInformation);

    return articleInformation;
  }

  @OnTransaction(ArticleInformationTransaction.DecreaseLikes)
  async decreaseLikes(articleInformation: ArticleInformation): Promise<ArticleInformation> {
    if (articleInformation.likes > 0) {
      articleInformation.likes -= 1;
    }

    await this.update(articleInformation.id, articleInformation);

    return articleInformation;
  }
}
