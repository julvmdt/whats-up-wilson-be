import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity, MessageEntity } from './../db';
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

  async createChat(userIds: number[], userId: number) {
    const findUserId = userIds.find(u => u === userId);
    if (!findUserId) {
      throw new UnauthorizedException(
        'Failed creating a chat without the own user',
      );
    }

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

  async getChat(chatId: number, userId: number) {
    return this.chatEntityRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.users', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('chat.id = :chatId', { chatId })
      .getOne();
  }

  async getChats(userId: number) {
    const user = await this.userService.usersByList([userId]);
    if (!user || user.length <= 0) {
      throw new BadRequestException('Sender not found');
    }

    // many to many is always a trouble
    const entitiesPlain = await this.chatEntityRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.users', 'user')
      .where('user.id = :userId', { userId })
      .select('chat.id')
      .getMany();

    const entities = [];
    for (const chat of entitiesPlain) {
      const entity = await this.chatEntityRepository.findOne(chat.id);
      entities.push(entity);
    }

    return entities;
  }

  async getMessages(chatId: number) {
    const chatEntity = await this.chatEntityRepository.findOne({
      where: {
        id: chatId,
      },
    });

    return chatEntity.messages;
  }

  async hasSeenMessages(chatId: number, userId: number) {
    const chatEntity = await this.chatEntityRepository.findOne(chatId);

    const messages = await chatEntity.messages;
    for (const message of messages) {
      const hasAlreadySeen = message.hasSeen.findIndex(u => u === userId) >= 0;
      if (!hasAlreadySeen) {
        message.hasSeen = [...message.hasSeen, userId];
        await this.chatEntityRepository.manager.save(message);
      }
    }
    return this.chatEntityRepository.findOne(chatId);
  }
}
