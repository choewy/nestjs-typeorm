import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;
}
