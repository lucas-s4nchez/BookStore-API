import { validate } from 'uuid';
import { InvalidUserIdException } from '../exceptions';

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
      throw new InvalidUserIdException('User id is not a valid uuid');
    }
  }
}
