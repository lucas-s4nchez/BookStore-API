import { RequiredFieldException } from '../../../shared/domain/exceptions';
import { InvalidUserNameException } from '../exceptions';

export class UserName {
  private readonly value: string;
  constructor(value: string) {
    this.isRequired(value);
    this.value = value.trim().toLowerCase();
    this.isValidUserName();
  }

  public getValue(): string {
    return this.value;
  }

  private isRequired(value: string) {
    if (!value) throw new RequiredFieldException('Name');
  }

  private isValidUserName() {
    if (this.value.length < 3) throw new InvalidUserNameException();
  }
}
