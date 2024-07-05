import { Email, Uuid } from '../../../shared/domain/value-objects';
import { User } from '../entities';
import { HashedUserPassword, UserLastName, UserName } from '../value-objects';

export interface UserRepository {
  create(user: User): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: Uuid): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  editEmail(email: Email, user: User): Promise<User | null>;
  editPassword(password: HashedUserPassword, user: User): Promise<User | null>;
  editNameAndLastName(
    name: UserName,
    lastName: UserLastName,
    user: User,
  ): Promise<User | null>;
  delete(user: User): Promise<User | null>;
}
