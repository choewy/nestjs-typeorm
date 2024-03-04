import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionManager, TransactionTarget } from '@extensions/typeorm-ex';
import { UserTransaction } from '@examples/users/repositories';

import { ArticleInformationTransaction, ArticleLikeHistoryTransaction, ArticleRepository, ArticleTransaction } from './repositories';
import { LikeOrUndoArticleCommand, PostArticleCommand } from './commands';
import { ArticleDto, ArticleInformationDto } from './dtos';

@Injectable()
export class ArticlesService {
  constructor(private readonly transactionManager: TransactionManager, private readonly articleRepository: ArticleRepository) {}

  async getArticles(): Promise<ArticleDto[]> {
    const articles = await this.articleRepository.find({
      relations: { user: true, information: true },
    });

    return articles.map((article) => new ArticleDto(article));
  }

  async createArticle(command: PostArticleCommand): Promise<ArticleDto> {
    const userTransaction = await this.transactionManager.run(new TransactionTarget(UserTransaction.FindById, command.userId));
    const user = userTransaction[0].value;

    if (user == null) {
      throw new NotFoundException('not found user');
    }

    const [article] = await this.transactionManager.run(
      new TransactionTarget(ArticleTransaction.Post, user),
      new TransactionTarget(ArticleInformationTransaction.Post).setReplaceArgs(),
    );

    return new ArticleDto(article.value);
  }

  async likeOrUndoArticle(command: LikeOrUndoArticleCommand): Promise<ArticleInformationDto> {
    const [userExists, articleExists, articleInformation, likeHistory] = await this.transactionManager.run(
      new TransactionTarget(UserTransaction.ExistsById, command.userId),
      new TransactionTarget(ArticleTransaction.ExistsById, command.articleId),
      new TransactionTarget(ArticleInformationTransaction.FindByArticleId, command.articleId),
      new TransactionTarget(ArticleLikeHistoryTransaction.FindByRelations, command.userId, command.articleId),
    );

    if (userExists.value !== true) {
      throw new NotFoundException('not found user');
    }

    if (articleExists.value !== true) {
      throw new NotFoundException('not found article');
    }

    if ((command.like && likeHistory.value) || (command.like === false && likeHistory.value === null)) {
      return new ArticleInformationDto(articleInformation.value);
    }

    const transactionTargets: TransactionTarget[] = [
      new TransactionTarget(ArticleInformationTransaction.FindByArticleId, command.articleId),
    ];

    if (command.like) {
      transactionTargets.push(
        new TransactionTarget(ArticleInformationTransaction.IncreaseLikes).setReplaceArgs(),
        new TransactionTarget(ArticleLikeHistoryTransaction.Insert, command.userId, command.articleId),
      );
    } else {
      transactionTargets.push(
        new TransactionTarget(ArticleInformationTransaction.DecreaseLikes).setReplaceArgs(),
        new TransactionTarget(ArticleLikeHistoryTransaction.Delete, command.userId, command.articleId),
      );
    }

    const [information] = await this.transactionManager.run(...transactionTargets);

    return new ArticleInformationDto(information.value);
  }
}
