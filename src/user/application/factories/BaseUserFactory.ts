/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../domain/entities/User';
import { ICreateUserDto } from '../dto';

export abstract class BaseUserFactory {
  static create(createUserDto: ICreateUserDto): User {
    throw new Error('Method not implemented.');
  }
}
