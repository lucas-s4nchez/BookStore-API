import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../entities/TypeOrmUser.entity';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import {
  UserId,
  UserEmail,
  UserLastName,
  UserName,
  UserPassword,
} from '../../domain/value-objects';

export class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly ormRepository: Repository<TypeOrmUser>,
  ) {}

  async create(user: User): Promise<User | null> {
    const ormUser = this.toTypeOrmUser(user);
    const savedOrmUser = await this.ormRepository.save(ormUser);
    return savedOrmUser ? this.toDomainUser(savedOrmUser) : null;
  }

  async findAll(): Promise<User[]> {
    const ormUsers = await this.ormRepository.find();
    return ormUsers.map((ormUser) => this.toDomainUser(ormUser));
  }

  async findById(id: UserId): Promise<User | null> {
    const ormUser = await this.ormRepository.findOneBy({
      id: id.getValue(),
    });
    return ormUser ? this.toDomainUser(ormUser) : null;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const ormUser = await this.ormRepository.findOneBy({
      email: email.getValue(),
    });
    return ormUser ? this.toDomainUser(ormUser) : null;
  }

  async editEmail(email: UserEmail, user: User): Promise<User | null> {
    user.setEmail(email.getValue());
    const updatedOrmUser = await this.ormRepository.save(
      this.toTypeOrmUser(user),
    );
    return updatedOrmUser ? this.toDomainUser(updatedOrmUser) : null;
  }
  toTypeOrmUser(user: User): TypeOrmUser {
    const typeOrmUser = new TypeOrmUser();
    typeOrmUser.id = user.getId();
    typeOrmUser.name = user.getName();
    typeOrmUser.lastName = user.getLastName();
    typeOrmUser.email = user.getEmail();
    typeOrmUser.password = user.getPassword();
    typeOrmUser.createdAt = user.getCreatedAt();
    typeOrmUser.updatedAt = user.getUpdatedAt();
    typeOrmUser.deletedAt = user.getDeletedAt();
    return typeOrmUser;
  }

  toDomainUser(typeOrmUser: TypeOrmUser): User {
    const id = new UserId(typeOrmUser.id);
    const name = new UserName(typeOrmUser.name);
    const lastName = new UserLastName(typeOrmUser.lastName);
    const email = new UserEmail(typeOrmUser.email);
    const password = new UserPassword(typeOrmUser.password);
    const createdAt = typeOrmUser.createdAt;
    const updatedAt = typeOrmUser.updatedAt;
    const deletedAt = typeOrmUser.deletedAt;
    const user = new User(
      id,
      name,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
      deletedAt,
    );
    return user;
  }
}
