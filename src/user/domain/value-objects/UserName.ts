import { InvalidUserNameException } from '../exceptions';

export class UserName {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidUserName();
  }

  public getValue(): string {
    return this.value;
  }

  private isValidUserName() {
    if (this.value.length < 3) {
      throw new InvalidUserNameException();
    }
  }
}
