import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionManager } from '@extensions/typeorm-ex';
import { UserTransaction } from '@domains/users/repositories';

import { ArticleInformationTransaction, ArticleTransaction } from './repositories';
import { PostArticleCommand } from './commands';

@Injectable()
export class ArticlesService {
  constructor(private readonly transactionManager: TransactionManager) {}

  async createArticle(command: PostArticleCommand) {
    const userTransaction = await this.transactionManager.run({
      name: UserTransaction.FindById,
      args: [command.userId],
    });

    const user = userTransaction[UserTransaction.FindById][0].value;

    if (user == null) {
      throw new NotFoundException('not found user');
    }

    const results = await this.transactionManager.run(
      {
        name: ArticleTransaction.Post,
        args: [user],
      },
      {
        name: ArticleInformationTransaction.Post,
        replaceArgs: true,
      },
    );

    return results;
  }
}
