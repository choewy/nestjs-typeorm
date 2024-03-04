import { InjectableRepository, ExtendsRepository, OnTransaction } from '@extensions/typeorm-ex';

import { User } from '@domains/users';

import { Article } from '../entities';
import { ArticleTransaction } from './enums';

@InjectableRepository(Article)
export class ArticleRepository extends ExtendsRepository<Article> {
  @OnTransaction(ArticleTransaction.ExistsById)
  async existsById(id: number): Promise<boolean> {
    return this.existsBy({ id });
  }

  @OnTransaction(ArticleTransaction.FindById)
  async findById(id: number): Promise<Article | null> {
    return this.findOneBy({ id });
  }

  @OnTransaction(ArticleTransaction.Post)
  async createArticle(user: User): Promise<Article> {
    const article = this.create({ user });
    await this.insert(article);
    return article;
  }
}
