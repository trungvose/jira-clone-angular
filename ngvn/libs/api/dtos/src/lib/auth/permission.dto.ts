import { ApiProperty } from '@nestjs/swagger';
import { PermissionType } from '@ngvn/shared/permission';
import { AutoMap } from 'nestjsx-automapper';

export class PermissionDto {
  @ApiProperty()
  @AutoMap()
  name: string;
  @ApiProperty()
  @AutoMap()
  score: number;
  @ApiProperty({ enumName: 'PermissionType', enum: PermissionType })
  @AutoMap()
  type: PermissionType;
  @ApiProperty({ type: String, default: [] })
  teams: string[];
  @ApiProperty({ type: String, default: [] })
  projects: string[];
}
