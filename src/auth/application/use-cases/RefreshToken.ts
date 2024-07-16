import { IResponse } from '../../../auth/domain/interfaces';
import { AuthService } from '../services';

export class RefreshToken {
  constructor(private readonly authService: AuthService) {}

  async execute(res: IResponse, refreshToken: string): Promise<void> {
    const newAccessToken =
      await this.authService.renewAccessToken(refreshToken);

    this.authService.setAccessTokenCookie(res, newAccessToken);
  }
}
