import { User } from '../../../user/domain/entities';
import { IUserAndToken } from '../../domain/interfaces';
import { JwtPayload } from '../interfaces';

export interface AuthService {
  generateToken(payload: JwtPayload): string;
  refreshToken(user: User): IUserAndToken;
}
