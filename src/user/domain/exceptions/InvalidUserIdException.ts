import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserIdException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserIdException';
  }
}
