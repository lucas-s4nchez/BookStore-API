/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ExpiredAccessTokenException,
  InvalidAccessTokenException,
} from '../exceptions';

@Injectable()
export class AccessJwtGuard extends AuthGuard('access-jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new ExpiredAccessTokenException();
      }
      throw err || new InvalidAccessTokenException();
    }
    return user;
  }
}
