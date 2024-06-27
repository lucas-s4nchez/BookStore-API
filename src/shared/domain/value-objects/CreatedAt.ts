import {
  InvalidCreatedAtException,
  RequiredFieldException,
} from '../exceptions';

export class CreatedAt {
  private value: Date;
  constructor(value: Date) {
    this.isRequired(value);
    this.value = value;
    this.isValidCreatedAt();
  }
  getValue(): Date {
    return this.value;
  }

  private isRequired(value: Date) {
    if (!value) throw new RequiredFieldException('Created At');
  }
  private isValidCreatedAt() {
    if (this.value > new Date()) throw new InvalidCreatedAtException();
  }
}
