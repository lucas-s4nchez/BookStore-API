import { HashPasswordService } from '../../application/services/HashPasswordService';
import * as bcrypt from 'bcrypt';

export class BcriptHashPasswordService implements HashPasswordService {
  private readonly saltRounds = 10;
  private readonly bcrypt = bcrypt;

  constructor() {}
  hashPassword(password: string): string {
    return this.bcrypt.hashSync(password, this.saltRounds);
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return this.bcrypt.compareSync(password, hashedPassword);
  }
}
