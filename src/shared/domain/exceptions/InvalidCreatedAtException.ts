import { DomainException } from './';

export class InvalidCreatedAtException extends DomainException {
  constructor() {
    super('Creation date must be a valid date, and not in the future');
    this.name = 'InvalidCreatedAtException';
  }
}
