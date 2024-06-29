import {
  InvalidDeletedAtException,
  RequiredFieldException,
} from '../exceptions';

export class DeletedAt {
  private value: Date | null;

  constructor(value: Date | null) {
    this.isRequired(value);
    this.value = value;
    this.isValidDeletedAt();
  }

  getValue(): Date | null {
    return this.value;
  }

  private isRequired(value: Date | null) {
    if (value === undefined) throw new RequiredFieldException('Deleted At');
  }

  private isValidDeletedAt() {
    if (this.value === null) return;
    if (this.value > new Date()) throw new InvalidDeletedAtException();
  }
}
