import { ApiProperty } from '@nestjs/swagger';
import { LoginParamsDto } from './login-params.dto';

export class RegisterParamsDto extends LoginParamsDto {
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
}
