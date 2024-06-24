import { HttpStatusCodes } from '../../../shared/application/enums';
import { ApplicationException } from '../../../shared/application/exceptions';

export class UserNotFoundException extends ApplicationException {
  constructor() {
    super('User not found', HttpStatusCodes.NOT_FOUND);
    this.name = 'UserNotFoundException';
  }
}
