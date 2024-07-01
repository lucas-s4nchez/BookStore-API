import { Email } from '../../../shared/domain/value-objects';
import { UserRepository } from '../../../user/domain/repository';
import { UserConcreteFactory } from '../../../user/application/factories/UserFactory';
import {
  UserAlreadyExistsException,
  UserFailsToCreateException,
} from '../../../user/application/exceptions';
import { ICreateUserDto } from '../../../user/application/dto';
import { IUserAndToken } from '../../domain/interfaces';
import { AuthService, HashPasswordService } from '../services';

export class SignUp {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(createUserDto: ICreateUserDto): Promise<IUserAndToken> {
    const user = UserConcreteFactory.create(createUserDto);

    const existingUser = await this.userRepository.findByEmail(
      new Email(createUserDto.email),
    );
    if (existingUser) throw new UserAlreadyExistsException();

    const passwordHash = this.hashPasswordService.hashPassword(
      user.getPassword(),
    );
    user.setHashedPassword(passwordHash);

    const createdUser = await this.userRepository.create(user);
    if (!createdUser) throw new UserFailsToCreateException();

    const token = this.authService.generateToken({ id: createdUser.getId() });

    return { user: createdUser, access_token: token } as IUserAndToken;
  }
}
