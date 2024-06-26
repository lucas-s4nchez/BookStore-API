/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/entities/User';
import {
  UserName,
  UserLastName,
  UserPassword,
} from '../../domain/value-objects';
import { ICreateUserDto } from '../dto';
import { Email, Uuid } from '../../../shared/domain/value-objects';

abstract class UserFactory {
  static create(createUserDto: ICreateUserDto): User {
    throw new Error('Method not implemented.');
  }
}

export class UserConcreteFactory extends UserFactory {
  static create(createUserDto: ICreateUserDto): User {
    const id = new Uuid(uuidv4());
    const name = new UserName(createUserDto.name);
    const lastName = new UserLastName(createUserDto.lastName);
    const email = new Email(createUserDto.email);
    const password = new UserPassword(createUserDto.password);
    const createdAt = new Date();
    const updatedAt = null;
    const deletedAt = null;

    return new User(
      id,
      name,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }
}
