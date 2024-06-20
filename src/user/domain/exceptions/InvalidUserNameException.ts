import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserNameException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserNameException';
  }
}
