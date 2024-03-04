import { ApiResponseProperty } from '@nestjs/swagger';

import { Article } from '../entities';
import { ArticleInformationDto } from './article-information.dto';

export class ArticleDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: ArticleInformationDto })
  information?: ArticleInformationDto;

  constructor(article: Article) {
    this.id = article.id;

    if (article.information) {
      this.information = new ArticleInformationDto(article.information);
    }
  }
}
