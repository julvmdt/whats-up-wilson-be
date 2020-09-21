import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ChatEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => MessageEntity,
    message => message.chat,
  )
  messages: Promise<MessageEntity[]>;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: Promise<UserEntity[]>;

  static of(users: UserEntity[]) {
    const entity = new ChatEntity();
    entity.messages = Promise.resolve([]);
    entity.users = Promise.resolve(users);
    return entity;
  }
}
