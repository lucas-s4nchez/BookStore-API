import { Controller, Get, Post, Body, Inject, Param } from '@nestjs/common';
import { ICreateUserDto } from '../../application/dto';
import {
  CreateUser,
  FindAllUsers,
  FindUserById,
} from '../../application/use-cases';

@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUser') private readonly createUser: CreateUser,
    @Inject('FindAllUsers') private readonly findAllUsers: FindAllUsers,
    @Inject('FindUserById') private readonly findUserById: FindUserById,
  ) {}

  @Post()
  async create(@Body() createUserDto: ICreateUserDto) {
    const userCreated = await this.createUser.execute(createUserDto);
    const mappedUser = userCreated.toPlainObject();
    return mappedUser;
  }

  @Get()
  async getAll() {
    const users = await this.findAllUsers.execute();
    const mappedUsers = users.map((user) => user.toPlainObject());
    return mappedUsers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.findUserById.execute(id);
    const mappedUser = user.toPlainObject();
    return mappedUser;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: IUpdateUserDto) {
  //   return 'update user';
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return 'delete user';
  // }
}
