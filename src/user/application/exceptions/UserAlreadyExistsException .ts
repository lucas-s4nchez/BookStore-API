import { ApplicationException } from '../../../shared/application/exceptions';
import { HttpStatusCodes } from '../../../shared/application/enums';

export class UserAlreadyExistsException extends ApplicationException {
  constructor() {
    super('User already exists', HttpStatusCodes.CONFLICT);
    this.name = 'UserAlreadyExistsException';
  }
}
