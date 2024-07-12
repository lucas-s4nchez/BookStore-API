import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class ExpiredTokenException extends ApplicationException {
  constructor() {
    super('Expired access token', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'ExpiredTokenException';
  }
}
