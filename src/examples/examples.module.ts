import { Module } from '@nestjs/common';

import { UsersModule } from './users';
import { ArticlesModule } from './articles';

@Module({
  imports: [UsersModule, ArticlesModule],
})
export class ExamplesModule {}
