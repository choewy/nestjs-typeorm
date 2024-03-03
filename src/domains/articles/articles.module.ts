import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@extensions/typeorm-ex';

import { ArticleInformationRepository, ArticleRepository } from './repositories';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [TypeOrmExModule.forFeature([ArticleRepository, ArticleInformationRepository])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
