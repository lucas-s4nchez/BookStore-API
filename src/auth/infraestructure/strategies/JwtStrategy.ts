import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { Uuid } from '../../../shared/domain/value-objects';
import { User } from '../../../user/domain/entities';
import { UserRepository } from '../../../user/domain/repository';
import { UserNotFoundException } from '../../../user/application/exceptions';
import { JwtPayload } from '../../application/interfaces';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CLAVE_SECRETA',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findById(new Uuid(id));
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
