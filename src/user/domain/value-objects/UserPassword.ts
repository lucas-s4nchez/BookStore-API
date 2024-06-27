import { InvalidUserPasswordException } from '../exceptions';
import { PASSWORD_PATTERN } from '../../../shared/domain/patterns';

export class UserPassword {
  private readonly value: string;
  private readonly pattern = PASSWORD_PATTERN;

  constructor(value: string) {
    this.isNotEmpty(value);
    this.value = value.trim();
    this.isValidUserPassword();
  }

  public getValue(): string {
    return this.value;
  }

  private isNotEmpty(value: string) {
    if (!value) {
      throw new InvalidUserPasswordException();
    }
  }

  private isValidUserPassword() {
    const isValid = this.pattern.test(this.value);
    if (!isValid) {
      throw new InvalidUserPasswordException();
    }
  }
}
