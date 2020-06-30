import { PermissionDto } from '@ngvn/api/dtos';
import { Permission } from '@ngvn/api/permission';
import { Profile, ProfileBase, AutoMapper, mapFrom, ignore } from 'nestjsx-automapper';

@Profile()
export class PermissionProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Permission, PermissionDto)
      .forMember(
        (d) => d.name,
        mapFrom((s) => s.permissionName),
      )
      .forMember(
        (d) => d.score,
        mapFrom((s) => s.privilege),
      )
      .forMember((d) => d.teams, ignore())
      .forMember((d) => d.projects, ignore())
      .reverseMap();
  }
}
