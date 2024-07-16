import { Request, Response } from 'express';
import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import {
  NoContentHttpResponseFactory,
  OkHttpResponseFactory,
} from '../../../shared/infraestructure/factories';
import { ICreateUserDto } from '../../../user/application/dto';
import { ISignInUserDto } from '../../application/dto';
import { RefreshToken, SignIn, SignUp } from '../../application/use-cases';
import { AuthWithRefreshToken } from '../decorators';
import { RefreshTokenNotFoundException } from '../exceptions';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SignUp') private readonly signUp: SignUp,
    @Inject('SignIn') private readonly signIn: SignIn,
    @Inject('RefreshToken') private readonly refreshToken: RefreshToken,
  ) {}

  @Post('sign-up')
  async signUpUser(
    @Res() res: Response,
    @Body() createUserDto: ICreateUserDto,
  ) {
    const { user, access_token, refresh_token } =
      await this.signUp.execute(createUserDto);
    const mappedUser = user.toPlainObject();
    const responseData = { user: mappedUser, access_token, refresh_token };

    return OkHttpResponseFactory.create(res, responseData).getSuccessResponse();
  }

  @Post('sign-in')
  async signInUser(
    @Res() res: Response,
    @Body() signInUserDto: ISignInUserDto,
  ) {
    const user = await this.signIn.execute(res, signInUserDto);
    const mappedUser = user.toPlainObject();

    return OkHttpResponseFactory.create(res, mappedUser).getSuccessResponse();
  }

  @Post('refresh-token')
  @AuthWithRefreshToken()
  async refreshTokenUser(@Res() res: Response, @Req() req: Request) {
    const refreshToken: string = req?.cookies?.refresh_token;

    if (!refreshToken) throw new RefreshTokenNotFoundException();

    await this.refreshToken.execute(res, refreshToken);

    return NoContentHttpResponseFactory.create(res).getSuccessResponse();
  }
}
