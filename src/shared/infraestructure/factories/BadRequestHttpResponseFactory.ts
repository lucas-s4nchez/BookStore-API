import { Response } from 'express';
import { BaseHttpResponseFactory } from './';
import { HttpStatusCodes } from '../../application/enums';
import { HttpResponse } from '../entities';

export class BadRequestHttpResponseFactory extends BaseHttpResponseFactory {
  static create(res: Response, data?: any): HttpResponse {
    return new HttpResponse(
      res,
      HttpStatusCodes.BAD_REQUEST,
      'Bad request',
      data,
    );
  }
}
