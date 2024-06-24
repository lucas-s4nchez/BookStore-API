import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainException } from '../../domain/exceptions';
import { BadRequestHttpResponseFactory } from '../factories';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    BadRequestHttpResponseFactory.create(
      response,
      exception.message,
    ).getFailedResponse();
  }
}
