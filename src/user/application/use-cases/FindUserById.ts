import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import { UserId } from '../../domain/value-objects';
import { UserNotFoundException } from '../exceptions';

export class FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(new UserId(id));
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
