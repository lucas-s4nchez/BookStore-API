import { ApplicationException } from '../../../shared/application/exceptions';
import { HttpStatusCodes } from '../../../shared/application/enums';

export class UserFailsToCreateException extends ApplicationException {
  constructor() {
    super('User not created', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    this.name = 'UserFailsToCreateException';
  }
}
