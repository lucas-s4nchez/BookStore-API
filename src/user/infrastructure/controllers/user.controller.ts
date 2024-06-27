import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Res,
  Patch,
} from '@nestjs/common';
import {
  ICreateUserDto,
  IEditUserEmailDto,
  IEditUserNameDto,
  IEditUserPasswordDto,
} from '../../application/dto';
import { CreatedHttpResponseFactory } from '../../../shared/infraestructure/factories/CreatedHttpResponseFactory';
import {
  CreateUser,
  EditUserEmail,
  EditUserName,
  EditUserPassword,
  FindAllUsers,
  FindUserById,
} from '../../application/use-cases';
import { Response } from 'express';
import { OkHttpResponseFactory } from '../../../shared/infraestructure/factories/OkHttpResponseFactory';

@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUser') private readonly createUser: CreateUser,
    @Inject('FindAllUsers') private readonly findAllUsers: FindAllUsers,
    @Inject('FindUserById') private readonly findUserById: FindUserById,
    @Inject('EditUserEmail') private readonly editUserEmail: EditUserEmail,
    @Inject('EditUserPassword')
    private readonly editUserPassword: EditUserPassword,
    @Inject('EditUserName') private readonly editUserName: EditUserName,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: ICreateUserDto) {
    const userCreated = await this.createUser.execute(createUserDto);
    const mappedUser = userCreated.toPlainObject();

    return CreatedHttpResponseFactory.create(
      res,
      mappedUser,
    ).getSuccessResponse();
  }

  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.findAllUsers.execute();
    const mappedUsers = users.map((user) => user.toPlainObject());

    return OkHttpResponseFactory.create(res, mappedUsers).getSuccessResponse();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const user = await this.findUserById.execute(id);
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-email/:id') //TODO: no utilizar parametro id, actualizar al usuario autenticado en el token
  async editEmail(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() editUserEmailDto: IEditUserEmailDto,
  ) {
    const user = await this.editUserEmail.execute(editUserEmailDto, id);
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-password/:id') //TODO: no utilizar parametro id, actualizar al usuario autenticado en el token
  async editPassword(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() editUserPasswordDto: IEditUserPasswordDto,
  ) {
    const user = await this.editUserPassword.execute(editUserPasswordDto, id);
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Patch('edit-name/:id') //TODO: no utilizar parametro id, actualizar al usuario autenticado en el token
  async editName(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() editUserNameDto: IEditUserNameDto,
  ) {
    const user = await this.editUserName.execute(editUserNameDto, id);
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return 'delete user';
  // }
}
