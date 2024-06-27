import { DomainException } from './';

export class RequiredFieldException extends DomainException {
  constructor(field: string) {
    super(`${field} is required`);
    this.name = 'RequiredFieldException';
  }
}
