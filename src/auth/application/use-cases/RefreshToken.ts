import { IUserAndToken } from '../../../auth/domain/interfaces';
import { User } from '../../../user/domain/entities';
import { AuthService } from '../services';

export class RefreshToken {
  constructor(private readonly authService: AuthService) {}

  async execute(user: User): Promise<IUserAndToken> {
    return this.authService.refreshToken(user);
  }
}
