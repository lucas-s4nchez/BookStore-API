import { UserRepository } from '../../domain/repository';
import { User } from '../../domain/entities';
import { ICreateUserDto } from '../dto';
import {
  UserAlreadyExistsException,
  UserFailsToCreateException,
} from '../exceptions';
import { UserFactory } from '../factories/UserFactory';
import { Email } from 'src/shared/domain/value-objects';

export class CreateUser {
  constructor(private readonly repository: UserRepository) {}
  async execute(createUserDto: ICreateUserDto): Promise<User> {
    const domainUser = UserFactory.create(createUserDto);

    const existingUser = await this.repository.findByEmail(
      new Email(createUserDto.email),
    );
    if (existingUser) throw new UserAlreadyExistsException();

    const createdUser = await this.repository.create(domainUser);
    if (!createdUser) throw new UserFailsToCreateException();

    return createdUser;
  }
}
