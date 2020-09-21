import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from './user.entity';

@Entity()
export class MessageEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @ManyToOne(
    type => ChatEntity,
    chat => chat.messages,
  )
  chat: Promise<ChatEntity>;

  @ManyToOne(type => UserEntity)
  sender: Promise<UserEntity>;

  static async of(message: string, sender: UserEntity, chat: ChatEntity) {
    const entity = new MessageEntity();
    entity.message = message;
    entity.sender = Promise.resolve(sender);
    entity.chat = Promise.resolve(chat);

    const messages = await chat.messages;
    chat.messages = Promise.resolve([...messages, entity]);

    return entity;
  }
}
