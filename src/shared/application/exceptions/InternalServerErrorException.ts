import { ApplicationException } from './';
import { HttpStatusCodes } from '../enums';

export class InternalServerErrorException extends ApplicationException {
  constructor() {
    super('Internal Server Error', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    this.name = 'InternalServerErrorException';
  }
}
