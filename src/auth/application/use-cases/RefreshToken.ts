import { AuthService } from '../services';

export class RefreshToken {
  constructor(private readonly authService: AuthService) {}

  async execute(refreshToken: string): Promise<string> {
    return await this.authService.renewAccessToken(refreshToken);
  }
}
