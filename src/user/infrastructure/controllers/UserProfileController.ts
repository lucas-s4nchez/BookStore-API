import { Response } from 'express';
import {
  Controller,
  Body,
  Inject,
  Res,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';

import {
  DeleteUser,
  EditUserEmail,
  EditUserName,
  EditUserPassword,
} from '../../application/use-cases';
import { OkHttpResponseFactory } from '../../../shared/infraestructure/factories/OkHttpResponseFactory';
import { Auth, GetUser } from '../../../auth/infraestructure/decorators';
import { UserRoles } from '../../../auth/domain/enums';
import {
  IEditUserEmailDto,
  IEditUserNameDto,
  IEditUserPasswordDto,
} from '../../application/dto';
import { User } from 'src/user/domain/entities';

@Controller('user/profile')
export class UserProfileController {
  constructor(
    @Inject('EditUserEmail') private readonly editUserEmail: EditUserEmail,
    @Inject('EditUserPassword')
    private readonly editUserPassword: EditUserPassword,
    @Inject('EditUserName') private readonly editUserName: EditUserName,
    @Inject('DeleteUser') private readonly deleteUser: DeleteUser,
  ) {}

  @Get() //TODO: get user and relations from db
  @Auth(UserRoles.USER, UserRoles.ADMIN)
  async getProfile(@Res() res: Response, @GetUser() user: User) {
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-email')
  @Auth(UserRoles.USER, UserRoles.ADMIN)
  async editEmail(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() editUserEmailDto: IEditUserEmailDto,
  ) {
    const editedUser = await this.editUserEmail.execute(editUserEmailDto, user);
    const mappedUser = editedUser.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-password')
  @Auth(UserRoles.USER, UserRoles.ADMIN)
  async editPassword(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() editUserPasswordDto: IEditUserPasswordDto,
  ) {
    const editedUser = await this.editUserPassword.execute(
      editUserPasswordDto,
      user,
    );
    const mappedUser = editedUser.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-name')
  @Auth(UserRoles.USER, UserRoles.ADMIN)
  async editName(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() editUserNameDto: IEditUserNameDto,
  ) {
    const editedUser = await this.editUserName.execute(editUserNameDto, user);
    const mappedUser = editedUser.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Delete('delete')
  @Auth(UserRoles.USER, UserRoles.ADMIN)
  async delete(@Res() res: Response, @GetUser() user: User) {
    const deletedUser = await this.deleteUser.execute(user);
    const mappedUser = deletedUser.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }
}
