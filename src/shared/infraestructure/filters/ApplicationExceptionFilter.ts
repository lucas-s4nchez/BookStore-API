import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApplicationException } from '../../application/exceptions';
import { HttpStatusCodes } from '../../application/enums';
import {
  BadRequestHttpResponseFactory,
  ConflictHttpResponseFactory,
  ForbiddenHttpResponseFactory,
  InternalServerErrorHttpResponseFactory,
  NotFoundHttpResponseFactory,
  UnauthorizedHttpResponseFactory,
} from '../factories';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case HttpStatusCodes.BAD_REQUEST:
        BadRequestHttpResponseFactory.create(
          response,
          exception.message,
        ).getFailedResponse();
        break;

      case HttpStatusCodes.UNAUTHORIZED:
        UnauthorizedHttpResponseFactory.create(
          response,
          exception.message,
        ).getFailedResponse();
        break;

      case HttpStatusCodes.FORBIDDEN:
        ForbiddenHttpResponseFactory.create(
          response,
          exception.message,
        ).getFailedResponse();
        break;

      case HttpStatusCodes.NOT_FOUND:
        NotFoundHttpResponseFactory.create(
          response,
          exception.message,
        ).getFailedResponse();
        break;

      case HttpStatusCodes.CONFLICT:
        ConflictHttpResponseFactory.create(
          response,
          exception.message,
        ).getFailedResponse();
        break;

      case HttpStatusCodes.INTERNAL_SERVER_ERROR:
        InternalServerErrorHttpResponseFactory.create(
          response,
          exception.message,
        ).getFailedResponse();
        break;

      default:
        InternalServerErrorHttpResponseFactory.create(
          response,
          'Internal server error',
        ).getFailedResponse();
        break;
    }
  }
}
