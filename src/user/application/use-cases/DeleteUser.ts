import { UserRepository } from '../../domain/repository';
import { User } from '../../domain/entities';
import { UserNotFoundException } from '../exceptions';

export class DeleteUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const deletedUser = await this.repository.delete(user);
    if (!deletedUser) throw new UserNotFoundException();

    return deletedUser;
  }
}
