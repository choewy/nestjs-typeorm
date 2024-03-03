import { ApiProperty } from '@nestjs/swagger';

export class LikeArticleCommand {
  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  articleId: number;
}
