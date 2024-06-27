import { validate } from 'uuid';
import { InvalidUuidException } from '../exceptions';

export class Uuid {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim();
    this.isValidUuid();
  }

  getValue(): string {
    return this.value;
  }

  private isValidUuid() {
    const isValid = validate(this.value);
    if (!isValid) throw new InvalidUuidException();
  }
}
