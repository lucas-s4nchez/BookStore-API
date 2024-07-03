import { RequiredFieldException } from '../../../shared/domain/exceptions';
import { InvalidRoleException } from '../../application/exceptions';
import { UserRoles } from '../enums';

export class Role {
  private readonly value: UserRoles;

  constructor(value: UserRoles) {
    this.isRequired(value);
    this.value = value;
    this.isValidRole();
  }

  private isRequired(value: UserRoles) {
    if (!value) throw new RequiredFieldException('Role');
  }

  public getValue(): UserRoles {
    return this.value;
  }

  isValidRole() {
    if (!Object.values(UserRoles).includes(this.value)) {
      throw new InvalidRoleException();
    }
  }
}
