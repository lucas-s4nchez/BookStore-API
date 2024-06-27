import { Uuid } from '../../../shared/domain/value-objects';
import { User } from '../../domain/entities';
import { UserName, UserLastName } from '../../domain/value-objects';
import { UserRepository } from '../../domain/repository';
import { IEditUserNameDto } from '../dto';
import {
  UserFailsToUpdateException,
  UserNotFoundException,
} from '../exceptions';

export class EditUserName {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    editUserNameDto: IEditUserNameDto,
    id: string,
  ): Promise<User | null> {
    const user = await this.repository.findById(new Uuid(id));

    if (!user) throw new UserNotFoundException();

    const editedUser = await this.repository.editNameAndLastName(
      new UserName(editUserNameDto.name),
      new UserLastName(editUserNameDto.lastName),
      user,
    );

    if (!editedUser) throw new UserFailsToUpdateException();

    return editedUser;
  }
}
