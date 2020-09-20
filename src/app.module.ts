import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';

import { UserResolver, UserService } from './user';
import { DbModule } from './db';
import { ConfigService } from './config.service';
import { AuthMiddleware } from './user/auth.middleware';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async () => ({
        context: ({ req, res }) => ({ req, res }),
        debug: true,
        playground: true,
        transformSchema: (schema: GraphQLSchema) =>
          mergeSchemas({
            schemas: [schema],
          }),
        typePaths: ['./**/*.graphql'],
      }),
    }),
    DbModule,
  ],
  providers: [UserResolver, UserService, ConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
