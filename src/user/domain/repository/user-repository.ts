import { User } from '../entities';
import { UserId } from '../value-objects';

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User>;
}
