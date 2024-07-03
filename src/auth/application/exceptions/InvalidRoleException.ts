import { HttpStatusCodes } from 'src/shared/application/enums';
import { ApplicationException } from 'src/shared/application/exceptions';

export class InvalidRoleException extends ApplicationException {
  constructor() {
    super('User not authorized, invalid role', HttpStatusCodes.FORBIDDEN);
    this.name = 'InvalidRoleException';
  }
}
