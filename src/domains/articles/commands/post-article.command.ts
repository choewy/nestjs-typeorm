import { ApiProperty } from '@nestjs/swagger';

export class PostArticleCommand {
  @ApiProperty({ type: Number })
  userId: number;
}
