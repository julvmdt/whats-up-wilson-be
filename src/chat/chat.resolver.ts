import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  ChatInput,
  CreateChatInput,
  SendMessageInput,
} from './../graphql.schema';
import { AuthGuard } from '../user/auth.guard';
import { ChatService } from './chat.service';
import { CurrentUser } from '../user/current-user';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query()
  @UseGuards(AuthGuard)
  chat(
    @Args('input') input: ChatInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    return this.chatService.getChat(input.chatId, currentUser.sub);
  }

  @Query()
  @UseGuards(AuthGuard)
  chats(@CurrentUser() currentUser: { sub: number }) {
    return this.chatService.getChats(currentUser?.sub);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  createChat(
    @Args('input') input: CreateChatInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    return this.chatService.createChat(input.userIds, currentUser.sub);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    return this.chatService.createMessage(
      input.message,
      currentUser.sub,
      input.chatId,
    );
  }

  @Mutation()
  @UseGuards(AuthGuard)
  hasSeenMessages(
    @Args('input') input: ChatInput,
    @CurrentUser() currentUser: { sub: number },
  ) {
    return this.chatService.hasSeenMessages(input.chatId, currentUser.sub);
  }
}
