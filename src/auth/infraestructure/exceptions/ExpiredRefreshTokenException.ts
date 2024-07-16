import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class ExpiredRefreshTokenException extends ApplicationException {
  constructor() {
    super('Expired refresh token', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'ExpiredRefreshTokenException';

    Object.setPrototypeOf(this, ExpiredRefreshTokenException.prototype);
  }
}
