import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { LikeOrUndoArticleCommand, PostArticleCommand } from './commands';
import { ArticleDto, ArticleInformationDto } from './dtos';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get Articles' })
  @ApiOkResponse({ type: [ArticleDto] })
  async getArticles() {
    return this.articlesService.getArticles();
  }

  @Post()
  @ApiOperation({ summary: 'Post Article' })
  @ApiCreatedResponse({ type: ArticleDto })
  async postArticle(@Body() command: PostArticleCommand) {
    return this.articlesService.createArticle(command);
  }

  @Post('likes')
  @ApiOperation({ summary: 'Like(or undo) Article' })
  @ApiCreatedResponse({ type: ArticleInformationDto })
  async likeOrUndoArticle(@Body() command: LikeOrUndoArticleCommand) {
    return this.articlesService.likeOrUndoArticle(command);
  }
}
