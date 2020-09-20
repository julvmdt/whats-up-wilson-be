import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User, UserInput } from './../graphql.schema';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation()
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input.userName, input.password);
  }

  @Query()
  user(@Args('input') input: UserInput) {
    return {
      userName: 'Test',
    } as User;
  }
}
