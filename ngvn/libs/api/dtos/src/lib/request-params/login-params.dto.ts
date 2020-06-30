import { ApiProperty } from '@nestjs/swagger';

export class LoginParamsDto {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}
