import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserRoles } from '../../domain/enums';
import { RequiredRoles } from './RequiredRoles';
import { JwtGuard, RoleGuard } from '../guards';

/**
 * A decorator function that applies the RequiredRoles and UseGuards (with JwtGuard and RoleGuard).
 *
 * @param {UserRoles[]} roles - The roles required to access the route.
 * @return {ReturnType<typeof applyDecorators>} The decorated function.
 */
export function Auth(...roles: UserRoles[]) {
  console.log(roles);
  return applyDecorators(
    RequiredRoles(...roles),
    UseGuards(JwtGuard, RoleGuard),
  );
}
