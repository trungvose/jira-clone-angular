import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const Cookie = createParamDecorator((cookieName: string, ctx: ExecutionContext) => {
  const request = GqlExecutionContext.create(ctx).getContext().req as Request;
  return request.cookies[cookieName];
});
