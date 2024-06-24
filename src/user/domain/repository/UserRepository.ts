import { User } from '../entities';
import { UserEmail, UserId } from '../value-objects';

export interface UserRepository {
  create(user: User): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
}
