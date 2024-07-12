import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Uuid } from '../../../shared/domain/value-objects';
import { JwtPayload } from '../../../auth/application/interfaces';
import { UserRepository } from '../../../user/domain/repository';
import { UserNotFoundException } from '../../../user/application/exceptions';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.refresh_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.userRepository.findById(new Uuid(id));
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
