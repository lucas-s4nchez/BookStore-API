import { InvalidUserPasswordException } from '../exceptions';

export class UserPassword {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidUserPassword();
  }

  public getValue(): string {
    return this.value;
  }

  private isValidUserPassword() {
    if (this.value.length < 8) {
      throw new InvalidUserPasswordException('Password is too short');
    }
  }
}
