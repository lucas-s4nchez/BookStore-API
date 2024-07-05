import { HashPasswordService } from '../../../auth/application/services';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repository';
import { HashedUserPassword } from '../../domain/value-objects';
import { IEditUserPasswordDto } from '../dto';
import { UserFailsToUpdateException } from '../exceptions';

export class EditUserPassword {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(
    editUserPasswordDto: IEditUserPasswordDto,
    user: User,
  ): Promise<User> {
    const hashedPassword = this.hashPasswordService.hashPassword(
      editUserPasswordDto.password,
    );

    const editedUser = await this.repository.editPassword(
      new HashedUserPassword(hashedPassword),
      user,
    );
    if (!editedUser) throw new UserFailsToUpdateException();

    return editedUser;
  }
}
