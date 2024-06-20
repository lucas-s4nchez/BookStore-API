import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserPasswordException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserPasswordException';
  }
}
