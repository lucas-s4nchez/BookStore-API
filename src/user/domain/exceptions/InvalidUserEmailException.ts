import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserEmailException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserEmailException';
  }
}
