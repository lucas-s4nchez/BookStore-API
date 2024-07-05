import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Res,
} from '@nestjs/common';

import { CreatedHttpResponseFactory } from '../../../shared/infraestructure/factories/CreatedHttpResponseFactory';
import {
  CreateUser,
  FindAllUsers,
  FindUserById,
} from '../../application/use-cases';
import { OkHttpResponseFactory } from '../../../shared/infraestructure/factories/OkHttpResponseFactory';
import { Auth } from '../../../auth/infraestructure/decorators';
import { UserRoles } from '../../../auth/domain/enums';
import { ICreateUserDto } from '../../application/dto';

@Controller('user/admin')
export class AdminUserManagementController {
  constructor(
    @Inject('CreateUser') private readonly createUser: CreateUser,
    @Inject('FindAllUsers') private readonly findAllUsers: FindAllUsers,
    @Inject('FindUserById') private readonly findUserById: FindUserById,
  ) {}

  @Post('create')
  @Auth(UserRoles.ADMIN)
  async create(@Res() res: Response, @Body() createUserDto: ICreateUserDto) {
    const userCreated = await this.createUser.execute(createUserDto);
    const mappedUser = userCreated.toPlainObject();

    return CreatedHttpResponseFactory.create(
      res,
      mappedUser,
    ).getSuccessResponse();
  }

  @Get('get-all')
  @Auth(UserRoles.ADMIN)
  async getAll(@Res() res: Response) {
    const users = await this.findAllUsers.execute();
    const mappedUsers = users.map((user) => user.toPlainObject());

    return OkHttpResponseFactory.create(res, mappedUsers).getSuccessResponse();
  }

  @Get('get-one/:id')
  @Auth(UserRoles.ADMIN)
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const user = await this.findUserById.execute(id);
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }
}
