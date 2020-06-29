import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { PermissionDto } from './permission.dto';

export class RoleDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  isGlobal: boolean;
  @ApiPropertyOptional()
  @AutoMap()
  parentId?: string;
  @ApiProperty()
  @AutoMap()
  name: string;
  @ApiProperty()
  @AutoMap()
  slug: string;
  @ApiProperty()
  @AutoMap()
  note: string;
  @ApiProperty({ type: () => PermissionDto, isArray: true })
  @AutoMap(() => PermissionDto)
  permissions: PermissionDto[];
}
