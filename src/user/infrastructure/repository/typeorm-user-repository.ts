import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMUserEntity } from '../entities/typeorm-user-entity.entity';
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
    @InjectRepository(TypeORMUserEntity)
    private readonly ormRepository: Repository<TypeORMUserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const ormUser = this.toORMEntity(user);
    const savedOrmUser = await this.ormRepository.save(ormUser);
    const domainUser = this.toDomainEntity(savedOrmUser);
    return domainUser;
  }

  async findAll(): Promise<User[]> {
    const ormUsers = await this.ormRepository.find();
    const domainUsers = ormUsers.map((ormUser) => this.toDomainEntity(ormUser));
    return domainUsers;
  }

  async findById(id: UserId): Promise<User> {
    const ormUser = await this.ormRepository.findOneBy({
      id: id.getValue(),
    });
    const domainUser = this.toDomainEntity(ormUser);
    return domainUser;
  }

  toORMEntity(user: User): TypeORMUserEntity {
    const OrmUserEntity = new TypeORMUserEntity();
    OrmUserEntity.id = user.getId();
    OrmUserEntity.name = user.getName();
    OrmUserEntity.lastName = user.getLastName();
    OrmUserEntity.email = user.getEmail();
    OrmUserEntity.password = user.getPassword();
    OrmUserEntity.createdAt = user.getCreatedAt();
    OrmUserEntity.updatedAt = user.getUpdatedAt();
    OrmUserEntity.deletedAt = user.getDeletedAt();
    return OrmUserEntity;
  }

  toDomainEntity(ormUserEntity: TypeORMUserEntity): User {
    const id = new UserId(ormUserEntity.id);
    const name = new UserName(ormUserEntity.name);
    const lastName = new UserLastName(ormUserEntity.lastName);
    const email = new UserEmail(ormUserEntity.email);
    const password = new UserPassword(ormUserEntity.password);
    const createdAt = ormUserEntity.createdAt;
    const updatedAt = ormUserEntity.updatedAt;
    const deletedAt = ormUserEntity.deletedAt;
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
