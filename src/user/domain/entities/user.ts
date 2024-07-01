import {
  CreatedAt,
  Email,
  Uuid,
  UpdatedAt,
  DeletedAt,
} from '../../../shared/domain/value-objects';
import {
  HashedUserPassword,
  UserLastName,
  UserName,
  UserPassword,
} from '../value-objects';

export class User {
  private readonly id: Uuid;
  private name: UserName;
  private lastName: UserLastName;
  private email: Email;
  private password: UserPassword | HashedUserPassword;
  private createdAt: CreatedAt;
  private updatedAt: UpdatedAt;
  private deletedAt: DeletedAt;

  constructor(
    id: Uuid,
    name: UserName,
    lastName: UserLastName,
    email: Email,
    password: UserPassword | HashedUserPassword,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
    deletedAt: DeletedAt,
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

  public setHashedPassword(password: string): void {
    this.password = new HashedUserPassword(password);
  }

  public getCreatedAt(): Date {
    return this.createdAt.getValue();
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = new CreatedAt(createdAt);
  }

  public getUpdatedAt(): Date | null {
    return this.updatedAt.getValue();
  }

  public setUpdatedAt(updatedAt: Date | null): void {
    this.updatedAt = new UpdatedAt(updatedAt);
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt.getValue();
  }

  public setDeletedAt(deletedAt: Date | null): void {
    this.deletedAt = new DeletedAt(deletedAt);
  }

  public toPlainObject() {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      lastName: this.lastName.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
      deletedAt: this.deletedAt.getValue(),
    };
  }
}
