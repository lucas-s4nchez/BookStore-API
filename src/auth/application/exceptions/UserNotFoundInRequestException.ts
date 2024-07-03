import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class UserNotFoundInRequestException extends ApplicationException {
  constructor() {
    super('User not found in request', HttpStatusCodes.NOT_FOUND);
    this.name = 'UserNotFoundInRequestException';
  }
}
