import { DomainException } from './';

export class InvalidUpdatedAtException extends DomainException {
  constructor() {
    super('Update date must be a valid date, and not in the future');
    this.name = 'InvalidUpdatedAtException';
  }
}
