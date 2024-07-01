export interface HashPasswordService {
  hashPassword(password: string): string;
  comparePassword(password: string, hashedPassword: string): boolean;
}
