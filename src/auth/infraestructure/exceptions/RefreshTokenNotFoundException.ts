import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class RefreshTokenNotFoundException extends ApplicationException {
  constructor() {
    super('Refresh token not found', HttpStatusCodes.UNAUTHORIZED);
    this.name = 'RefreshTokenNotFoundException';

    Object.setPrototypeOf(this, RefreshTokenNotFoundException.prototype);
  }
}
