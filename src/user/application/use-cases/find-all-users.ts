import { UserRepository } from '../../domain/repository';

export class FindAllUsers {
  constructor(private readonly repository: UserRepository) {}

  async execute() {
    return await this.repository.findAll();
  }
}
