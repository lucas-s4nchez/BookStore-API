import { Response } from 'express';
import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { OkHttpResponseFactory } from '../../../shared/infraestructure/factories';
import { ICreateUserDto } from '../../../user/application/dto';
import { ISignInUserDto } from '../../application/dto';
import { SignIn, SignUp } from '../../application/use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SignUp') private readonly signUp: SignUp,
    @Inject('SignIn') private readonly signIn: SignIn,
  ) {}

  @Post('sign-up')
  async signUpUser(
    @Res() res: Response,
    @Body() createUserDto: ICreateUserDto,
  ) {
    const { user, access_token } = await this.signUp.execute(createUserDto);
    const mappedUser = user.toPlainObject();
    const responseData = { user: mappedUser, access_token };

    return OkHttpResponseFactory.create(res, responseData).getSuccessResponse();
  }

  @Post('sign-in')
  async signInUser(
    @Res() res: Response,
    @Body() signInUserDto: ISignInUserDto,
  ) {
    const { user, access_token } = await this.signIn.execute(signInUserDto);
    const mappedUser = user.toPlainObject();
    const responseData = { user: mappedUser, access_token };

    return OkHttpResponseFactory.create(res, responseData).getSuccessResponse();
  }

  @Get('refresh-token')
  async refreshToken() {
    return null;
  }
}
