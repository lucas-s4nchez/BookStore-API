import { DomainException } from './';

export class InvalidDeletedAtException extends DomainException {
  constructor() {
    super('Elimination date must be a valid date, and not in the future');
    this.name = 'InvalidDeletedAtException';
  }
}
