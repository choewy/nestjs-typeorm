import { ApiResponseProperty } from '@nestjs/swagger';

import { ArticleInformation } from '../entities';

export class ArticleInformationDto {
  @ApiResponseProperty({ type: Number })
  likes: number;

  constructor(articleInformation: ArticleInformation) {
    this.likes = articleInformation.likes;
  }
}
