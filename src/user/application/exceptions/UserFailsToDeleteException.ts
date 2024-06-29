import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class UserFailsToDeleteException extends ApplicationException {
  constructor() {
    super('User fails to delete', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    this.name = 'UserFailsToDeleteException';
  }
}
