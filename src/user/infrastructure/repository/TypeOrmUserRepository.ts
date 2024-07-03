import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatedAt,
  DeletedAt,
  Email,
  UpdatedAt,
  Uuid,
} from '../../../shared/domain/value-objects';
import { Role } from '../../../auth/domain/value-objects';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import {
  HashedUserPassword,
  UserLastName,
  UserName,
  UserPassword,
} from '../../domain/value-objects';
import { TypeOrmUser } from '../entities/TypeOrmUser.entity';

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

  async findById(id: Uuid): Promise<User | null> {
    const ormUser = await this.ormRepository.findOneBy({
      id: id.getValue(),
    });
    return ormUser ? this.toDomainUser(ormUser) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const ormUser = await this.ormRepository.findOneBy({
      email: email.getValue(),
    });
    return ormUser ? this.toDomainUser(ormUser) : null;
  }

  async editEmail(email: Email, user: User): Promise<User | null> {
    user.setEmail(email.getValue());
    user.setUpdatedAt(new Date());
    const updatedOrmUser = await this.ormRepository.save(
      this.toTypeOrmUser(user),
    );
    return updatedOrmUser ? this.toDomainUser(updatedOrmUser) : null;
  }

  async editPassword(password: UserPassword, user: User): Promise<User | null> {
    user.setPassword(password.getValue());
    user.setUpdatedAt(new Date());
    const updatedOrmUser = await this.ormRepository.save(
      this.toTypeOrmUser(user),
    );
    return updatedOrmUser ? this.toDomainUser(updatedOrmUser) : null;
  }

  async editNameAndLastName(
    name: UserName,
    lastName: UserLastName,
    user: User,
  ): Promise<User | null> {
    user.setName(name.getValue());
    user.setLastName(lastName.getValue());
    user.setUpdatedAt(new Date());
    const updatedOrmUser = await this.ormRepository.save(
      this.toTypeOrmUser(user),
    );
    return updatedOrmUser ? this.toDomainUser(updatedOrmUser) : null;
  }

  async delete(user: User): Promise<User | null> {
    //TODO: borrar en cascada las entidades relacionadas
    user.setDeletedAt(new Date());
    const deletedOrmUser = await this.ormRepository.save(
      this.toTypeOrmUser(user),
    );
    return deletedOrmUser ? this.toDomainUser(deletedOrmUser) : null;
  }

  toTypeOrmUser(user: User): TypeOrmUser {
    const typeOrmUser = new TypeOrmUser();
    typeOrmUser.id = user.getId();
    typeOrmUser.name = user.getName();
    typeOrmUser.lastName = user.getLastName();
    typeOrmUser.email = user.getEmail();
    typeOrmUser.password = user.getPassword();
    typeOrmUser.role = user.getRole();
    typeOrmUser.createdAt = user.getCreatedAt();
    typeOrmUser.updatedAt = user.getUpdatedAt();
    typeOrmUser.deletedAt = user.getDeletedAt();
    return typeOrmUser;
  }

  toDomainUser(typeOrmUser: TypeOrmUser): User {
    const id = new Uuid(typeOrmUser.id);
    const name = new UserName(typeOrmUser.name);
    const lastName = new UserLastName(typeOrmUser.lastName);
    const email = new Email(typeOrmUser.email);
    const password = new HashedUserPassword(typeOrmUser.password);
    const role = new Role(typeOrmUser.role);
    const createdAt = new CreatedAt(typeOrmUser.createdAt);
    const updatedAt = new UpdatedAt(typeOrmUser.updatedAt);
    const deletedAt = new DeletedAt(typeOrmUser.deletedAt);
    const user = new User(
      id,
      name,
      lastName,
      email,
      password,
      role,
      createdAt,
      updatedAt,
      deletedAt,
    );
    return user;
  }
}
