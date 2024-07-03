import { v4 as uuidv4 } from 'uuid';
import {
  CreatedAt,
  DeletedAt,
  Email,
  UpdatedAt,
  Uuid,
} from '../../../shared/domain/value-objects';
import { UserRoles } from '../../../auth/domain/enums';
import { Role } from '../../../auth/domain/value-objects';
import { User } from '../../domain/entities/User';
import {
  UserName,
  UserLastName,
  UserPassword,
} from '../../domain/value-objects';
import { ICreateUserDto } from '../dto';
import { BaseUserFactory } from './BaseUserFactory';

export class AdminFactory extends BaseUserFactory {
  static create(createUserDto: ICreateUserDto): User {
    const id = new Uuid(uuidv4());
    const name = new UserName(createUserDto.name);
    const lastName = new UserLastName(createUserDto.lastName);
    const email = new Email(createUserDto.email);
    const password = new UserPassword(createUserDto.password);
    const role = new Role(UserRoles.ADMIN);
    const createdAt = new CreatedAt(new Date());
    const updatedAt = new UpdatedAt(null);
    const deletedAt = new DeletedAt(null);

    return new User(
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
  }
}
