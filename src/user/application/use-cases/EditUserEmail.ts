import { Email } from '../../../shared/domain/value-objects';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import {
  UserAlreadyExistsException,
  UserFailsToUpdateException,
} from '../exceptions';
import { IEditUserEmailDto } from '../dto';

export class EditUserEmail {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    editUserEmailDto: IEditUserEmailDto,
    user: User,
  ): Promise<User> {
    const existingUserByEmail = await this.repository.findByEmail(
      new Email(editUserEmailDto.email),
    );
    if (existingUserByEmail) throw new UserAlreadyExistsException();

    const editedUser = await this.repository.editEmail(
      new Email(editUserEmailDto.email),
      user,
    );
    if (!editedUser) throw new UserFailsToUpdateException();

    return editedUser;
  }
}
