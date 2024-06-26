import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserNameException extends DomainException {
  constructor() {
    super('Name is too short');
    this.name = 'InvalidUserNameException';
  }
}
