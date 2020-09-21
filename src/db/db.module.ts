import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity, ChatEntity, MessageEntity } from './entities';

@Global()
@Module({
  exports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, ChatEntity, MessageEntity]),
  ],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, ChatEntity, MessageEntity]),
  ],
  providers: [],
})
export class DbModule {}
