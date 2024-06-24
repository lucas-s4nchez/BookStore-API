import { HttpStatusCodes } from '../enums';

export class ApplicationException extends Error {
  constructor(
    readonly message: string,
    readonly code: HttpStatusCodes,
  ) {
    super(message);
    this.name = 'ApplicationException';
  }
}
