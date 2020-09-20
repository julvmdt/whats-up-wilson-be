import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities';

@Global()
@Module({
  exports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
  providers: [],
})
export class DbModule {}
