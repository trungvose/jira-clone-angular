import { PermissionDto } from '@ngvn/api/dtos';
import { Permission } from '@ngvn/api/permission';
import { Profile, ProfileBase, AutoMapper } from 'nestjsx-automapper';

@Profile()
export class PermissionProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Permission, PermissionDto).reverseMap();
  }
}
