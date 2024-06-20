import { UserRepository } from '../../domain/repository';
import { UserId } from '../../domain/value-objects';

export class FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    return await this.userRepository.findById(new UserId(id));
  }
}
