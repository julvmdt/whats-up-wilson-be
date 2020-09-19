import { CreateUserInput, User, UserInput } from './../graphql.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @Mutation()
  createUser(@Args('input') input: CreateUserInput) {
    return Promise.resolve({
      userName: input.userName,
    } as User);
  }

  @Query()
  user(@Args('input') input: UserInput) {
    return {
      userName: 'Test',
    } as User;
  }
}
