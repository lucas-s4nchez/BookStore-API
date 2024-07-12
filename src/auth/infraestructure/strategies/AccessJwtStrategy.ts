import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Uuid } from '../../../shared/domain/value-objects';
import { User } from '../../../user/domain/entities';
import { UserRepository } from '../../../user/domain/repository';
import { UserNotFoundException } from '../../../user/application/exceptions';
import { JwtPayload } from '../../application/interfaces';

export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findById(new Uuid(id));
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
