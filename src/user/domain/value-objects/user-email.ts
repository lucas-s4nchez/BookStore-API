export class UserEmail {
  private readonly value: string;
  constructor(value: string) {
    this.value = value.trim().toLowerCase();
    this.isValidUserEmail();
  }

  public getValue(): string {
    return this.value;
  }

  private isValidUserEmail() {
    if (this.value.length < 3) {
      throw new Error('Email is too short');
    }
  }
}
