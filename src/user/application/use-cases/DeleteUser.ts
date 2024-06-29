import { Uuid } from '../../../shared/domain/value-objects';
import { UserRepository } from '../../domain/repository';
import { User } from '../../domain/entities';
import { UserNotFoundException } from '../exceptions';

export class DeleteUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.repository.findById(new Uuid(id));
    if (!user) throw new UserNotFoundException();

    const deletedUser = await this.repository.delete(user);
    if (!deletedUser) throw new UserNotFoundException();

    return deletedUser;
  }
}
