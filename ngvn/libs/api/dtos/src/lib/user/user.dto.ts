import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';

export class UserDto extends BaseDto {
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
  roleId: string;
  @ApiProperty()
  @AutoMap()
  roleName: string;
}
