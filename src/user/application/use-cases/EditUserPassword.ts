import { Uuid } from '../../../shared/domain/value-objects';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import { UserPassword } from '../../domain/value-objects';
import { IEditUserPasswordDto } from '../dto';
import {
  UserFailsToUpdateException,
  UserNotFoundException,
} from '../exceptions';

export class EditUserPassword {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    editUserPasswordDto: IEditUserPasswordDto,
    id: string,
  ): Promise<User> {
    const user = await this.repository.findById(new Uuid(id));
    if (!user) throw new UserNotFoundException();

    const editedUser = await this.repository.editPassword(
      new UserPassword(editUserPasswordDto.password),
      user,
    );
    if (!editedUser) throw new UserFailsToUpdateException();

    return editedUser;
  }
}
