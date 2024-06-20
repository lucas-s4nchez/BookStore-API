import { UserRepository } from '../../domain/repository';
import { ICreateUserDto } from '../dto';
import { UserConcreteFactory } from '../factories/UserFactory';
export class CreateUser {
  constructor(private readonly repository: UserRepository) {}
  async execute(createUserDto: ICreateUserDto) {
    const user = UserConcreteFactory.create(createUserDto);
    return await this.repository.create(user);
  }
}
