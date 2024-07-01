import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../user/domain/entities';
import { IUserAndToken } from '../../domain/interfaces';
import { AuthService } from '../../application/services';
import { JwtPayload } from '../../application/interfaces';

export class JwtAuthService implements AuthService {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  refreshToken(user: User): IUserAndToken {
    return {
      user: user,
      access_token: this.generateToken({ id: user.getId() }),
    };
  }
}
