import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';

export class FindAllUsers {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repository.findAll();
  }
}
