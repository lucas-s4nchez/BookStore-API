import { User } from '../../../user/domain/entities';
import { IResponse } from '../../domain/interfaces';
import { JwtPayload } from '../interfaces';

export interface AuthService {
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<string>;
  validateUser(payload: JwtPayload): Promise<User | null>;
  renewAccessToken(refreshToken: string): Promise<string>;
  verifyRefreshToken(refreshToken: string): Promise<JwtPayload>;
  setAccessTokenCookie(res: IResponse, accessToken: string): void;
  setRefreshTokenCookie(res: IResponse, refreshToken: string): void;
}
