import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Article } from './article.entity';

@Entity()
export class ArticleInformation {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @OneToOne(() => Article, (e) => e.information, { onDelete: 'CASCADE' })
  @JoinColumn()
  article: Article;
}
