import { Email } from '../../../shared/domain/value-objects';
import { UserRepository } from '../../../user/domain/repository';
import { UserFactory } from './../../../user/application/factories/UserFactory';
import {
  UserAlreadyExistsException,
  UserFailsToCreateException,
} from '../../../user/application/exceptions';
import { ICreateUserDto } from '../../../user/application/dto';
import { AuthService, HashPasswordService } from '../services';

export class SignUp {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(createUserDto: ICreateUserDto): Promise<any> {
    const domainUser = UserFactory.create(createUserDto);

    const existingUser = await this.userRepository.findByEmail(
      new Email(createUserDto.email),
    );
    if (existingUser) throw new UserAlreadyExistsException();

    const passwordHash = this.hashPasswordService.hashPassword(
      domainUser.getPassword(),
    );
    domainUser.setHashedPassword(passwordHash);

    const createdUser = await this.userRepository.create(domainUser);
    if (!createdUser) throw new UserFailsToCreateException();

    const accessToken = await this.authService.generateAccessToken(createdUser);
    const refreshToken =
      await this.authService.generateRefreshToken(createdUser);

    return {
      user: createdUser,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
