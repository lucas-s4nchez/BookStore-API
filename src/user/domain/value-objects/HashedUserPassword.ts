import { RequiredFieldException } from '../../../shared/domain/exceptions';

export class HashedUserPassword {
  private readonly value: string;

  constructor(value: string) {
    this.isRequired(value);
    this.value = value.trim();
  }

  public getValue(): string {
    return this.value;
  }

  private isRequired(value: string) {
    if (!value) throw new RequiredFieldException('Password');
  }
}
