import { DomainException } from './DomainException';

export class InvalidEmailException extends DomainException {
  constructor() {
    super('Email is not valid');
    this.name = 'InvalidEmailException';
  }
}
