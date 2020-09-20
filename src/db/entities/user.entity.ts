import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  userName: string;

  @Column('text')
  password: string;

  static async of(userName: string, password: string) {
    const entity = new UserEntity();

    entity.userName = userName;
    entity.password = await bcrypt.hash(password, 10);

    return entity;
  }
}
