import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class ExpiredAccessTokenException extends ApplicationException {
  constructor() {
    super('Expired access token', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'ExpiredAccessTokenException';

    Object.setPrototypeOf(this, ExpiredAccessTokenException.prototype);
  }
}
