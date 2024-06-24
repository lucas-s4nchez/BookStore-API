import { Response } from 'express';
import { BaseHttpResponseFactory } from './';
import { HttpStatusCodes } from '../../application/enums';
import { HttpResponse } from '../entities';

export class InternalServerErrorHttpResponseFactory extends BaseHttpResponseFactory {
  static create(res: Response, data?: any): HttpResponse {
    return new HttpResponse(
      res,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Internal server error',
      data,
    );
  }
}
