import { Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Article } from '@examples/articles/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @OneToMany(() => Article, (e) => e.user, { cascade: true })
  @JoinTable()
  articles: Article[];
}
