import { Email } from '../../../shared/domain/value-objects';
import { User } from '../../../user/domain/entities';
import { UserRepository } from '../../../user/domain/repository';
import { UserPassword } from '../../../user/domain/value-objects';
import { IResponse } from '../../domain/interfaces';
import { InvalidCredentialsException } from '../exceptions';
import { AuthService, HashPasswordService } from '../services';
import { ISignInUserDto } from '../dto';

export class SignIn {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(res: IResponse, signInUserDto: ISignInUserDto): Promise<User> {
    const email = new Email(signInUserDto.email);
    const password = new UserPassword(signInUserDto.password);

    const user = await this.userRepository.findByEmail(
      new Email(email.getValue()),
    );
    if (!user) throw new InvalidCredentialsException();

    const isPasswordValid = this.hashPasswordService.comparePassword(
      password.getValue(),
      user.getPassword(),
    );
    if (!isPasswordValid) throw new InvalidCredentialsException();

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    this.authService.setRefreshTokenCookie(res, refreshToken);
    this.authService.setAccessTokenCookie(res, accessToken);

    return user;
  }
}
