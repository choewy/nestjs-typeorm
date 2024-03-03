import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { PostArticleCommand } from './commands';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async postArticle(@Body() command: PostArticleCommand) {
    return this.articlesService.createArticle(command);
  }
}
