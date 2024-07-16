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
import {
  AuthWithAccessToken,
  GetUser,
} from '../../../auth/infraestructure/decorators';
import { UserRoles } from '../../../auth/domain/enums';
import { User } from '../../domain/entities';
import {
  IEditUserEmailDto,
  IEditUserNameDto,
  IEditUserPasswordDto,
} from '../../application/dto';

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
  @AuthWithAccessToken(UserRoles.USER, UserRoles.ADMIN)
  async getProfile(@Res() res: Response, @GetUser() user: User) {
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-email')
  @AuthWithAccessToken(UserRoles.USER, UserRoles.ADMIN)
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
  @AuthWithAccessToken(UserRoles.USER, UserRoles.ADMIN)
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
  @AuthWithAccessToken(UserRoles.USER, UserRoles.ADMIN)
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
  @AuthWithAccessToken(UserRoles.USER, UserRoles.ADMIN)
  async delete(@Res() res: Response, @GetUser() user: User) {
    const deletedUser = await this.deleteUser.execute(user);
    const mappedUser = deletedUser.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }
}
