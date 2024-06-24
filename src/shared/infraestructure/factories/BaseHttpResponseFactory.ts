/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { HttpResponse } from '../entities';

export abstract class BaseHttpResponseFactory {
  static create(res: Response, data?: any): HttpResponse {
    throw new Error('Method not implemented.');
  }
}
