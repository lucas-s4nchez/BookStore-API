import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserLastNameException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserLastNameException';
  }
}
