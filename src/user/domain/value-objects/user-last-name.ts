export class UserLastName {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidUserLastName();
  }
  public getValue(): string {
    return this.value;
  }
  private isValidUserLastName() {
    if (this.value.length < 3) {
      throw new Error('Last Name is too short');
    }
  }
}
