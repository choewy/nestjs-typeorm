import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';

import { Article } from './article.entity';

@Entity()
export class ArticleInformation {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  likes: number;

  @OneToOne(() => Article, (e) => e.information, { onDelete: 'CASCADE' })
  @JoinColumn()
  article: Article;
}
