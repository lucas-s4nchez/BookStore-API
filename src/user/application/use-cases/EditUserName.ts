import { User } from '../../domain/entities';
import { UserName, UserLastName } from '../../domain/value-objects';
import { UserRepository } from '../../domain/repository';
import { IEditUserNameDto } from '../dto';
import { UserFailsToUpdateException } from '../exceptions';

export class EditUserName {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    editUserNameDto: IEditUserNameDto,
    user: User,
  ): Promise<User | null> {
    const editedUser = await this.repository.editNameAndLastName(
      new UserName(editUserNameDto.name),
      new UserLastName(editUserNameDto.lastName),
      user,
    );

    if (!editedUser) throw new UserFailsToUpdateException();

    return editedUser;
  }
}
