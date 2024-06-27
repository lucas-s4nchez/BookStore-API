import { RequiredFieldException } from '../../../shared/domain/exceptions';
import { InvalidUserLastNameException } from '../exceptions';

export class UserLastName {
  private readonly value: string;
  constructor(value: string) {
    this.isRequired(value);
    this.value = value.trim().toLowerCase();
    this.isValidUserLastName();
  }
  public getValue(): string {
    return this.value;
  }

  private isRequired(value: string) {
    if (!value) throw new RequiredFieldException('Last Name');
  }
  private isValidUserLastName() {
    if (this.value.length < 3) throw new InvalidUserLastNameException();
  }
}
