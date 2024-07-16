import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class InvalidRefreshTokenException extends ApplicationException {
  constructor() {
    super('Invalid refresh token', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'InvalidRefreshTokenException';

    Object.setPrototypeOf(this, InvalidRefreshTokenException.prototype);
  }
}
