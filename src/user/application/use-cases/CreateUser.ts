import { UserEmail } from '../../domain/value-objects';
import { UserRepository } from '../../domain/repository';
import { User } from '../../domain/entities';
import { ICreateUserDto } from '../dto';
import {
  UserAlreadyExistsException,
  UserNotCreatedException,
} from '../exceptions';
import { UserConcreteFactory } from '../factories/UserFactory';

export class CreateUser {
  constructor(private readonly repository: UserRepository) {}
  async execute(createUserDto: ICreateUserDto): Promise<User> {
    const existingUser = await this.repository.findByEmail(
      new UserEmail(createUserDto.email),
    );
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }
    const user = UserConcreteFactory.create(createUserDto);
    const createdUser = await this.repository.create(user);
    if (!createdUser) {
      throw new UserNotCreatedException();
    }
    return createdUser;
  }
}
