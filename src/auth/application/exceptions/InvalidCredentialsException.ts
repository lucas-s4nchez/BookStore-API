import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class InvalidCredentialsException extends ApplicationException {
  constructor() {
    super('Invalid email or password', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'InvalidCredentials';
  }
}
