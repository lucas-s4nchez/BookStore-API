import { Response } from 'express';
import { HttpStatusCodes } from '../../application/enums';

export class HttpResponse {
  private res: Response;
  private status: HttpStatusCodes;
  private statusMessage: string;
  private data: any;
  constructor(
    res: Response,
    status: HttpStatusCodes,
    statusMessage: string,
    data: any,
  ) {
    this.res = res;
    this.status = status;
    this.statusMessage = statusMessage;
    this.data = data;
  }

  public getFailedResponse() {
    return this.res.status(this.status).json({
      status: this.status,
      statusMessage: this.statusMessage,
      error: this.data,
    });
  }

  public getSuccessResponse() {
    return this.res.status(this.status).json({
      status: this.status,
      statusMessage: this.statusMessage,
      data: this.data,
    });
  }
}
