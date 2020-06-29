import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from '../api-exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse() as Response;
    const req = ctx.getRequest() as Request;
    const statusCode = exception.getStatus();
    const stackTrace = exception.stack;
    const errorResponse = exception.getResponse();
    let errorName = exception.name;
    let errors = null;

    if (typeof errorResponse === 'object') {
      errorName = errorResponse['name'] || errorResponse['error'] || exception.name;
      errors = errorResponse['errors'];

      if (statusCode === HttpStatus.UNAUTHORIZED) {
        errorResponse['message'] = errorResponse['message'] || 'Unauthorized';
      }
    }

    const path = req?.url;
    const apiException = new ApiException(errorResponse['message'], errorName, stackTrace, errors, path, statusCode);
    res.status(statusCode).json(apiException);
  }
}
