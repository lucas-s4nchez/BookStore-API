import { DomainException } from './DomainException';

export class InvalidUuidException extends DomainException {
  constructor() {
    super('Id is not a valid uuid');
    this.name = 'InvalidUuidException';
  }
}
