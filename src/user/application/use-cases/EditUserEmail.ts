import { UserEmail, UserId } from '../../domain/value-objects';
import { UserRepository } from '../../domain/repository';
import {
  UserFailsToUpdateException,
  UserNotFoundException,
} from '../exceptions';
import { IEditUserEmailDto } from '../dto';

export class EditUserEmail {
  constructor(private readonly repository: UserRepository) {}

  async execute(editUserEmailDto: IEditUserEmailDto, id: string) {
    const user = await this.repository.findById(new UserId(id));
    if (!user) {
      throw new UserNotFoundException();
    }
    const editedUser = await this.repository.editEmail(
      new UserEmail(editUserEmailDto.email),
      user,
    );
    if (!editedUser) {
      throw new UserFailsToUpdateException();
    }
    return editedUser;
  }
}
