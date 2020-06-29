import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';

export class UserInformationDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  email: string;
  @ApiProperty()
  @AutoMap()
  firstName: string;
  @ApiProperty()
  @AutoMap()
  lastName: string;
  @ApiProperty()
  @AutoMap()
  fullName: string;
  @ApiProperty({ type: Object, additionalProperties: { type: 'integer' } })
  @AutoMap()
  permissions: { [key: string]: number };
}
