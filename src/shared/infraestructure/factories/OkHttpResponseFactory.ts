import { Response } from 'express';
import { BaseHttpResponseFactory } from './';
import { HttpStatusCodes } from '../../application/enums';
import { HttpResponse } from '../entities';

export class OkHttpResponseFactory extends BaseHttpResponseFactory {
  static create(res: Response, data?: any): HttpResponse {
    return new HttpResponse(res, HttpStatusCodes.OK, 'Success', data);
  }
}
