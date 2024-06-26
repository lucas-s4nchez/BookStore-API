import { Email, Uuid } from '../../../shared/domain/value-objects';
import { User } from '../entities';

export interface UserRepository {
  create(user: User): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: Uuid): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  editEmail(email: Email, user: User): Promise<User | null>;
}
