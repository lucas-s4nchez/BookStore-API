export class UserPassword {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidUserPassword();
  }

  public getValue(): string {
    return this.value;
  }

  private isValidUserPassword() {
    if (this.value.length < 8) {
      throw new Error('Password is too short');
    }
  }
}
