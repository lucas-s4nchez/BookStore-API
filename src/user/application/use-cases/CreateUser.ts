import { Email } from '../../../shared/domain/value-objects';
import { HashPasswordService } from '../../../auth/application/services';
import { UserRepository } from '../../domain/repository';
import { User } from '../../domain/entities';
import { ICreateUserDto } from '../dto';
import {
  UserAlreadyExistsException,
  UserFailsToCreateException,
} from '../exceptions';
import { UserFactory } from '../factories/UserFactory';

export class CreateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashPasswordService: HashPasswordService,
  ) {}
  async execute(createUserDto: ICreateUserDto): Promise<User> {
    const domainUser = UserFactory.create(createUserDto);

    const existingUser = await this.repository.findByEmail(
      new Email(createUserDto.email),
    );
    if (existingUser) throw new UserAlreadyExistsException();

    const passwordHash = this.hashPasswordService.hashPassword(
      domainUser.getPassword(),
    );
    domainUser.setHashedPassword(passwordHash);

    const createdUser = await this.repository.create(domainUser);
    if (!createdUser) throw new UserFailsToCreateException();

    return createdUser;
  }
}
