import { Email } from '../../../shared/domain/value-objects';
import { IUserAndToken } from '../../domain/interfaces';
import { UserRepository } from '../../../user/domain/repository';
import { UserPassword } from '../../../user/domain/value-objects';
import { InvalidCredentialsException } from '../exceptions';
import { AuthService, HashPasswordService } from '../services';
import { ISignInUserDto } from '../dto';

export class SignIn {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(signInUserDto: ISignInUserDto): Promise<IUserAndToken> {
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

    const token = this.authService.generateToken({ id: user.getId() });

    return { user: user, access_token: token } as IUserAndToken;
  }
}
