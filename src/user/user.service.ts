import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { UserEntity } from './../db';
import { ConfigService } from './../config.service';
import { LoginResponse } from '../graphql.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
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

  async loginUser(userName: string, password: string) {
    const user = await this.userEntityRepository.findOne({
      where: { userName },
    });

    if (!user) {
      throw new UnauthorizedException('User doesnt exist');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const token = jwt.sign(
      {
        sub: user.id,
        name: user.userName,
        iat: Date.now(),
        exp: moment()
          .add(1, 'days')
          .unix(),
      },
      this.configService.authSecret,
    );

    return {
      token,
    } as LoginResponse;
  }

  async users() {
    return this.userEntityRepository.find();
  }

  async usersByList(userIds: number[]) {
    return this.userEntityRepository.find({
      where: {
        id: In(userIds),
      },
    });
  }
}
