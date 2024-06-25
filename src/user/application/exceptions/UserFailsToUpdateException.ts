import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class UserFailsToUpdateException extends ApplicationException {
  constructor() {
    super('User fails to update', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    this.name = 'UserFailsToUpdateException';
  }
}
