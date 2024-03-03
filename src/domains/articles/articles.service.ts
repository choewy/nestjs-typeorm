import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionManager, TransactionTarget } from '@extensions/typeorm-ex';
import { UserTransaction } from '@domains/users/repositories';

import { ArticleInformationTransaction, ArticleTransaction } from './repositories';
import { PostArticleCommand } from './commands';

@Injectable()
export class ArticlesService {
  constructor(private readonly transactionManager: TransactionManager) {}

  async createArticle(command: PostArticleCommand) {
    const userTransaction = await this.transactionManager.run(new TransactionTarget(UserTransaction.FindById, { args: [command.userId] }));

    const user = userTransaction[0].value;

    if (user == null) {
      throw new NotFoundException('not found user');
    }

    const articleTransaction = await this.transactionManager.run(
      new TransactionTarget(ArticleTransaction.Post, { args: [user] }),
      new TransactionTarget(ArticleInformationTransaction.Post, { replaceArgs: true }),
    );

    return articleTransaction;
  }
}
