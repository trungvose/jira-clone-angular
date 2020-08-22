import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthUserDto } from '@ngvn/api/dtos';

export function getAuthUser(context: ExecutionContext): AuthUserDto {
  return GqlExecutionContext.create(context).getContext().req.user as AuthUserDto;
}
