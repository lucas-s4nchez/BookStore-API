import { validate } from 'uuid';

export class UserId {
  private readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.isValidUserId();
  }

  getValue(): string {
    return this.value;
  }

  private isValidUserId() {
    const isValid = validate(this.value);
    if (!isValid) {
      throw new Error('User id is not a valid uuid');
    }
  }
}
