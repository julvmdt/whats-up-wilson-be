import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const executionContext = GqlExecutionContext.create(context);
    const req = executionContext.getContext().req;
    return req.user !== undefined && req.user !== null;
  }
}
