import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
}
