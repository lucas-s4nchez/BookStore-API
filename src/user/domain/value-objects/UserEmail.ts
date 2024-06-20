import { InvalidUserEmailException } from '../exceptions';

export class UserEmail {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidUserEmail();
  }

  public getValue(): string {
    return this.value;
  }

  private isValidUserEmail() {
    if (this.value.length < 3) {
      throw new InvalidUserEmailException('Email is too short');
    }
  }
}
