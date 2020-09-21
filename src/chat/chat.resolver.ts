import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateChatInput,
  CreateUserInput,
  SendMessageInput,
  UserInput,
} from './../graphql.schema';
import { AuthGuard } from '../user/auth.guard';
import { UserService } from '../user/user.service';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/user/current-user';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation()
  @UseGuards(AuthGuard)
  createChat(@Args('input') input: CreateChatInput) {
    return this.chatService.createChat(input.userIds);
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

  //   @Query()
  //   login(@Args('input') input: UserInput) {
  //     return this.userService.loginUser(input.userName, input.password);
  //   }

  //   @Query()
  //   @UseGuards(AuthGuard)
  //   users() {
  //     return this.userService.users();
  //   }
}
