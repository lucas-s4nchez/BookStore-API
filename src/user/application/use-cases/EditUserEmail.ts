import { Email, Uuid } from '../../../shared/domain/value-objects';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import {
  UserFailsToUpdateException,
  UserNotFoundException,
} from '../exceptions';
import { IEditUserEmailDto } from '../dto';

export class EditUserEmail {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    editUserEmailDto: IEditUserEmailDto,
    id: string,
  ): Promise<User> {
    const user = await this.repository.findById(new Uuid(id));
    if (!user) {
      throw new UserNotFoundException();
    }
    const editedUser = await this.repository.editEmail(
      new Email(editUserEmailDto.email),
      user,
    );
    if (!editedUser) {
      throw new UserFailsToUpdateException();
    }
    return editedUser;
  }
}
