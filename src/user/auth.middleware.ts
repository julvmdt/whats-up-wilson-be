import { Inject, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config.service';

export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req?.headers?.authorization;
    const token = authHeaders?.split(' ')[1];
    console.log('headers', req.headers);
    console.log('token', token);
    if (token) {
      try {
        const decoded = jwt.verify(token, this.configService.authSecret);
        if (decoded) {
          (req as any).user = decoded;
        }
      } catch (e) {
        console.log(e);
      }
    }
    next();
  }
}
