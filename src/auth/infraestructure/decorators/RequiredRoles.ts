import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../domain/enums';

export const ROLES_KEY = 'roles';
/**
 * Defines the required roles for accessing a route.
 *
 * @param {UserRoles[]} roles - The roles required to access the route.
 */
export const RequiredRoles = (...roles: UserRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
