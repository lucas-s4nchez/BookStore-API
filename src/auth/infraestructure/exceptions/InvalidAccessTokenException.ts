import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class InvalidAccessTokenException extends ApplicationException {
  constructor() {
    super('Invalid access token', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'InvalidAccessTokenException';

    Object.setPrototypeOf(this, InvalidAccessTokenException.prototype);
  }
}
