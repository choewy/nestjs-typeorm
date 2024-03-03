import { Entity, PrimaryGeneratedColumn, OneToOne, JoinTable, ManyToOne, JoinColumn } from 'typeorm';

import { ArticleInformation } from './article-information.entity';
import { User } from '@domains/users';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @ManyToOne(() => User, (e) => e.articles, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToOne(() => ArticleInformation, (e) => e.article, { cascade: true })
  @JoinTable()
  information: ArticleInformation;
}
