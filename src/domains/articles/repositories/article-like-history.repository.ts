import { ExtendsRepository, InjectableRepository, OnTransaction } from '@extensions/typeorm-ex';

import { ArticleLikeHistory } from '../entities';
import { ArticleLikeHistoryTransaction } from './enums';

@InjectableRepository(ArticleLikeHistory)
export class ArticleLikeHistoryRepository extends ExtendsRepository<ArticleLikeHistory> {
  @OnTransaction(ArticleLikeHistoryTransaction.ExistsByRelations)
  async existsByRelations(userId: number, articleId: number): Promise<boolean> {
    return this.existsBy({
      user: { id: userId },
      article: { id: articleId },
    });
  }

  @OnTransaction(ArticleLikeHistoryTransaction.FindByRelations)
  async findByRelations(userId: number, articleId: number): Promise<ArticleLikeHistory | null> {
    return this.findOneBy({
      user: { id: userId },
      article: { id: articleId },
    });
  }

  @OnTransaction(ArticleLikeHistoryTransaction.Insert)
  async insertHistory(userId: number, articleId: number): Promise<void> {
    await this.insert(
      this.create({
        user: { id: userId },
        article: { id: articleId },
      }),
    );
  }

  @OnTransaction(ArticleLikeHistoryTransaction.Delete)
  async deleteHistory(userId: number, articleId: number): Promise<void> {
    await this.delete({
      user: { id: userId },
      article: { id: articleId },
    });
  }
}
