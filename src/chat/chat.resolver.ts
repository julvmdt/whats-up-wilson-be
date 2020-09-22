import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  ChatInput,
  CreateChatInput,
  SendMessageInput,
  Chat,
  Message,
} from './../graphql.schema';
import { AuthGuard } from '../user/auth.guard';
import { ChatService } from './chat.service';
import { CurrentUser } from '../user/current-user';
import { ChatEntity } from 'src/db';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query()
  @UseGuards(AuthGuard)
  async chat(
    @Args('input') input: ChatInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    const entity = await this.chatService.getChat(
      input.chatId,
      currentUser.sub,
    );
    return this.transformChatEntityToChat(entity);
  }

  @Query()
  @UseGuards(AuthGuard)
  async chats(@CurrentUser() currentUser: { sub: number }) {
    const chatEntities = await this.chatService.getChats(currentUser?.sub);
    const chats: Chat[] = [];
    for (const chatEntity of chatEntities) {
      const chat = await this.transformChatEntityToChat(chatEntity);
      chats.push(chat);
    }
    return chats;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createChat(
    @Args('input') input: CreateChatInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    const entity = await this.chatService.createChat(
      input.userIds,
      currentUser.sub,
    );
    return this.transformChatEntityToChat(entity);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    const entity = await this.chatService.createMessage(
      input.message,
      currentUser.sub,
      input.chatId,
    );
    const sender = await entity.sender;
    return {
      id: entity.id,
      createdAt: entity.createdAt.toString(),
      message: entity.message,
      hasSeen: entity.hasSeen,
      sender: {
        id: sender.id,
        userName: sender.userName,
      },
    } as Message;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async hasSeenMessages(
    @Args('input') input: ChatInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    const entity = await this.chatService.hasSeenMessages(
      input.chatId,
      currentUser.sub,
    );
    return this.transformChatEntityToChat(entity);
  }

  private async transformChatEntityToChat(chat: ChatEntity) {
    const users = await chat.users;
    const messageEntities = await chat.messages;

    const messages = [];
    for (const messageEntity of messageEntities) {
      const sender = await messageEntity.sender;
      messages.push({
        id: messageEntity.id,
        createdAt: messageEntity.createdAt.toString(),
        message: messageEntity.message,
        hasSeen: messageEntity.hasSeen,
        sender: {
          id: sender.id,
          userName: sender.userName,
        },
      } as Message);
    }

    return {
      id: chat.id,
      messages,
      userIds: users?.map(u => u.id),
    } as Chat;
  }
}
