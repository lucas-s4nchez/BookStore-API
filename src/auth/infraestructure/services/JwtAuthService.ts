import { Response } from 'express';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Uuid } from '../../../shared/domain/value-objects';
import { UserRepository } from '../../../user/domain/repository';
import { UserNotFoundException } from '../../../user/application/exceptions';
import { User } from '../../../user/domain/entities';
import { AuthService } from '../../application/services';
import { JwtPayload } from '../../application/interfaces';

export class JwtAuthService implements AuthService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiration: number;
  private readonly refreshTokenExpiration: number;
  private readonly accessTokenCookieExpiration: number;
  private readonly refreshTokenCookieExpiration: number;

  constructor(
    private readonly configService: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET_KEY',
    );
    this.refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET_KEY',
    );
    this.accessTokenExpiration = this.configService.get<number>(
      'ACCESS_TOKEN_EXPIRATION',
    );
    this.refreshTokenExpiration = this.configService.get<number>(
      'REFRESH_TOKEN_EXPIRATION',
    );
    this.accessTokenCookieExpiration = this.configService.get<number>(
      'COOKIE_ACCESS_TOKEN_EXPIRATION',
    );
    this.refreshTokenCookieExpiration = this.configService.get<number>(
      'COOKIE_REFRESH_TOKEN_EXPIRATION',
    );
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.getId() };
    return this.jwtService.signAsync(payload, {
      secret: this.accessTokenSecret,
      expiresIn: this.accessTokenExpiration,
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.getId() };
    return this.jwtService.signAsync(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: this.refreshTokenExpiration,
    });
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayload | null> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.refreshTokenSecret,
        },
      );
      return payload;
    } catch (error) {
      return null;
    }
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return this.userRepository.findById(new Uuid(payload.id));
  }

  async renewAccessToken(refreshToken: string): Promise<string> {
    const payload = await this.verifyRefreshToken(refreshToken);
    if (!payload) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.validateUser(payload);
    if (!user) throw new UserNotFoundException();

    return await this.generateAccessToken(user);
  }

  setAccessTokenCookie(res: Response, accessToken: string): void {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.accessTokenCookieExpiration,
    });
  }

  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.refreshTokenCookieExpiration,
    });
  }
}
