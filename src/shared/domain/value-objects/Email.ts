import { InvalidEmailException } from '../exceptions';
import { EMAIL_PATTERN } from '../patterns';

export class Email {
  private readonly value: string;
  private readonly pattern = EMAIL_PATTERN;

  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidEmail();
  }

  public getValue(): string {
    return this.value;
  }

  private isValidEmail() {
    const isValid = this.pattern.test(this.value);
    if (!isValid) {
      throw new InvalidEmailException();
    }
  }
}
