import { ApiProperty } from '@nestjs/swagger';

export class LikeOrUndoArticleCommand {
  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  articleId: number;

  @ApiProperty({ type: Boolean })
  like: boolean;
}
