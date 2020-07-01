import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const statusCode = exception.getStatus();
    const stackTrace = exception.stack;
    const errorResponse = exception.getResponse();

    if (typeof errorResponse === 'object' && statusCode === HttpStatus.UNAUTHORIZED) {
      errorResponse['message'] = errorResponse['message'] || 'Unauthorized';
    }

    throw new GraphQLError(errorResponse['message'], undefined, undefined, undefined, undefined, exception, {
      code: HttpStatus[statusCode],
      exception: { stacktrace: [stackTrace] },
    });
  }
}
