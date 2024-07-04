import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../../../user/domain/entities';
import { UserNotFoundInRequestException } from '../../application/exceptions';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new UserNotFoundInRequestException();

    return user;
  },
);
