/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ExpiredRefreshTokenException,
  InvalidRefreshTokenException,
} from '../exceptions';

@Injectable()
export class RefreshJwtGuard extends AuthGuard('refresh-jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new ExpiredRefreshTokenException();
      }
      throw err || new InvalidRefreshTokenException();
    }
    return user;
  }
}
