import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { ChatEntity, MessageEntity, UserEntity } from './../db';
import { ConfigService } from './../config.service';
import { LoginResponse } from '../graphql.schema';
import { UserService } from '../user';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatEntityRepository: Repository<ChatEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageEntityRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
  ) {}

  async createChat(userIds: number[]) {
    const users = await this.userService.usersByList(userIds);
    const chatEntity = ChatEntity.of(users);
    return this.chatEntityRepository.save(chatEntity);
  }

  async createMessage(message: string, senderId: number, chatId: number) {
    const senderUser = await this.userService.usersByList([senderId]);
    if (!senderUser || senderUser.length <= 0) {
      throw new BadRequestException('Sender not found');
    }

    const chatEntity = await this.chatEntityRepository.findOne({
      where: {
        id: chatId,
      },
    });

    const messageEntity = await MessageEntity.of(
      message,
      senderUser[0],
      chatEntity,
    );
    return this.messageEntityRepository.manager.transaction(
      async entityManager => {
        const result = await entityManager.save(messageEntity);
        await entityManager.save(chatEntity);
        return result;
      },
    );
  }

  async getChats(userId: number) {
    const user = await this.userService.usersByList([userId]);
    if (!user || user.length <= 0) {
      throw new BadRequestException('Sender not found');
    }

    const chats = await this.chatEntityRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.users', 'users')
      .where('users = :userId', { userId })
      .getMany();

    return chats;
  }

  async getMessages(chatId: number) {
    const chatEntity = await this.chatEntityRepository.findOne({
      where: {
        id: chatId,
      },
    });

    return chatEntity.messages;
  }
}
