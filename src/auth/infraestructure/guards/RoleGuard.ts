import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from '../../domain/enums';
import {
  InvalidRoleException,
  UserNotFoundInRequestException,
} from '../../application/exceptions';
import { ROLES_KEY } from '../decorators';

@Injectable()
export class Roleguard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles: UserRoles[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    if (requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    //TODO: agregar rol a usuarios
    const user = req.user;

    if (!user) throw new UserNotFoundInRequestException();

    const isValidRole = requiredRoles.includes(user.role);

    if (!isValidRole) throw new InvalidRoleException();

    return true;
  }
}
