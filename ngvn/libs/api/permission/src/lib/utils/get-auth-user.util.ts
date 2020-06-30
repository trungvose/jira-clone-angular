import { ExecutionContext } from '@nestjs/common';
import { AuthUserDto } from '@ngvn/api/dtos';
import { Request } from 'express';

export function getAuthUser(context: ExecutionContext): AuthUserDto {
  return (context.switchToHttp().getRequest<Request>() as any).user as AuthUserDto;
}
