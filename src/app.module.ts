import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';

import { UserResolver } from './user';
import { DbModule } from './db';

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
  providers: [UserResolver],
})
export class AppModule {}
