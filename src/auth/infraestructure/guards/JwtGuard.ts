/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpiredTokenException, InvalidTokenException } from '../exceptions';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/application/services';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {
    super();
  }

  // async canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest<Request>();
  //   const response = context.switchToHttp().getResponse<Response>();

  //   try {
  //     // Intentar autenticar usando el access_token
  //     return (await super.canActivate(context)) as boolean;
  //   } catch (err) {
  //     if (err.name === 'ExpiredTokenException') {
  //       const refreshToken = request.cookies?.refresh_token;
  //       if (refreshToken) {
  //         try {
  //           const newAccessToken =
  //             await this.authService.renewAccessToken(refreshToken);
  //           request.cookies['access_token'] = newAccessToken;

  //           return (await super.canActivate(context)) as boolean;
  //         } catch (refreshErr) {
  //           throw refreshErr;
  //         }
  //       }
  //     }
  //     throw err;
  //   }
  // }
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new ExpiredTokenException();
      }
      throw err || new InvalidTokenException();
    }
    return user;
  }
}
