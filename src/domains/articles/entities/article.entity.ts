import { Entity, PrimaryGeneratedColumn, OneToOne, JoinTable } from 'typeorm';

import { ArticleInformation } from './article-information.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @OneToOne(() => ArticleInformation, (e) => e.article, { cascade: true })
  @JoinTable()
  information: ArticleInformation;
}
