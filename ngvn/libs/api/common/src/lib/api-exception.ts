import { HttpStatus } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApiException {
  @ApiPropertyOptional() statusCode?: number;
  @ApiPropertyOptional() message?: string;
  @ApiPropertyOptional() status?: string;
  @ApiPropertyOptional() error?: string;
  @ApiPropertyOptional() errors?: any;
  @ApiPropertyOptional() timestamp?: string;
  @ApiPropertyOptional() path?: string;
  @ApiPropertyOptional() stack?: string;

  constructor(message: string, error: string, stack: string, errors: any, path: string, statusCode: number) {
    this.message = message;
    this.error = error;
    this.stack = stack;
    this.errors = errors;
    this.path = path;
    this.timestamp = new Date().toISOString();
    this.statusCode = statusCode;
    this.status = HttpStatus[statusCode];
  }
}
