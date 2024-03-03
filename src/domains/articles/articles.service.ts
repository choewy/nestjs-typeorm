import { Injectable } from '@nestjs/common';

import { ArticleInformationRepository, ArticleRepository } from './repositories';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly articleInformationRepository: ArticleInformationRepository,
  ) {}
}
