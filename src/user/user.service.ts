import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './../db';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async createUser(userName: string, password: string) {
    if (!userName || userName === '') {
      throw new UnauthorizedException('No User Name provided');
    }

    const user = await this.userEntityRepository.findOne({
      where: { userName },
    });

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    if (!password || password.length < 6) {
      throw new UnauthorizedException('Password is empty or to short');
    }

    const createdUser = await UserEntity.of(userName, password);

    return this.userEntityRepository.save(createdUser);
  }
}
