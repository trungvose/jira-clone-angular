import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { RoleDto } from './role.dto';

export class AuthUserDto extends BaseDto {
  @AutoMap()
  email: string;
  @AutoMap(() => RoleDto)
  role: RoleDto;
}
