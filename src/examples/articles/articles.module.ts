import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@extensions/typeorm-ex';

import { ArticleRepository, ArticleInformationRepository, ArticleLikeHistoryRepository } from './repositories';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [TypeOrmExModule.forFeature([ArticleRepository, ArticleInformationRepository, ArticleLikeHistoryRepository])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
