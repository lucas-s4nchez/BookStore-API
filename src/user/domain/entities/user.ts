import { Email, Uuid } from '../../../shared/domain/value-objects';
import { UserLastName, UserName, UserPassword } from '../value-objects';

export class User {
  private readonly id: Uuid;
  private name: UserName;
  private lastName: UserLastName;
  private email: Email;
  private password: UserPassword;
  private createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(
    id: Uuid,
    name: UserName,
    lastName: UserLastName,
    email: Email,
    password: UserPassword,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public getId(): string {
    return this.id.getValue();
  }

  public getName(): string {
    return this.name.getValue();
  }

  public setName(name: string): void {
    this.name = new UserName(name);
  }

  public getLastName(): string {
    return this.lastName.getValue();
  }

  public setLastName(lastName: string): void {
    this.lastName = new UserLastName(lastName);
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public setEmail(email: string): void {
    this.email = new Email(email);
  }

  public getPassword(): string {
    return this.password.getValue();
  }

  public setPassword(password: string): void {
    this.password = new UserPassword(password);
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date | null): void {
    this.updatedAt = updatedAt;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  public setDeletedAt(deletedAt: Date | null): void {
    this.deletedAt = deletedAt;
  }

  public toPlainObject() {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      lastName: this.lastName.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
