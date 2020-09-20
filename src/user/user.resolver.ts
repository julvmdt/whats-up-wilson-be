import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, UserInput } from './../graphql.schema';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation()
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input.userName, input.password);
  }

  @Query()
  login(@Args('input') input: UserInput) {
    return this.userService.loginUser(input.userName, input.password);
  }
}
