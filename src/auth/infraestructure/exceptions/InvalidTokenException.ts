import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class InvalidTokenException extends ApplicationException {
  constructor() {
    super('Invalid token', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'InvalidTokenException';
  }
}
