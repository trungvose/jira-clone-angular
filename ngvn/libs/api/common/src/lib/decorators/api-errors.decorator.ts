import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiException } from '../api-exception';

export const ApiErrors = () => {
  return applyDecorators(
    ApiNotFoundResponse({ type: ApiException, description: 'Not found' }),
    ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' }),
    ApiInternalServerErrorResponse({
      type: ApiException,
      description: 'Internal Server Error',
    }),
    ApiUnauthorizedResponse({
      type: ApiException,
      description: 'Unauthorized',
    }),
    ApiForbiddenResponse({ type: ApiException, description: 'Forbidden' }),
  );
};
