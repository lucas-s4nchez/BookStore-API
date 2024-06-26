import { Uuid } from '../../../shared/domain/value-objects';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import { UserNotFoundException } from '../exceptions';

export class FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(new Uuid(id));
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
