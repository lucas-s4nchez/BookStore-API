import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserLastNameException extends DomainException {
  constructor() {
    super('Last Name is too short');
    this.name = 'InvalidUserLastNameException';
  }
}
