import {
  InvalidUpdatedAtException,
  RequiredFieldException,
} from '../exceptions';

export class UpdatedAt {
  private value: Date | null;
  constructor(value: Date | null) {
    this.isRequired(value);
    this.value = value;
    this.isValidUpdatedAt();
  }

  getValue(): Date | null {
    return this.value;
  }

  private isRequired(value: Date | null) {
    if (value === undefined) throw new RequiredFieldException('Updated At');
  }

  private isValidUpdatedAt() {
    if (this.value === null) return;

    if (this.value > new Date()) throw new InvalidUpdatedAtException();
  }
}
