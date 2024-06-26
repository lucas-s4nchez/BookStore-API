import { DomainException } from '../../../shared/domain/exceptions';

export class InvalidUserPasswordException extends DomainException {
  constructor() {
    super(
      'Password should be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and no special characters.',
    );
    this.name = 'InvalidUserPasswordException';
  }
}
