import { Response } from 'express';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { OkHttpResponseFactory } from '../../../shared/infraestructure/factories';
import { UserRoles } from '../../../auth/domain/enums';
import { User } from '../../../user/domain/entities';
import { ICreateUserDto } from '../../../user/application/dto';
import { ISignInUserDto } from '../../application/dto';
import { RefreshToken, SignIn, SignUp } from '../../application/use-cases';
import { Auth, GetUser } from '../decorators';

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

  @Post('refresh-token')
  @Auth(UserRoles.USER)
  async refreshTokenUser(@Res() res: Response, @GetUser() user: User) {
    const { user: u, access_token } = await this.refreshToken.execute(user);
    const mappedUser = u.toPlainObject();

    const userAndNewToken = {
      user: mappedUser,
      access_token,
    };

    return OkHttpResponseFactory.create(
      res,
      userAndNewToken,
    ).getSuccessResponse();
  }
}
