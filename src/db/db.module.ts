import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  exports: [],
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([])],
  providers: [],
})
export class DbModule {}
