import { RoleDto } from '@ngvn/api/dtos';
import { Role } from '@ngvn/api/role';
import { Profile, ProfileBase, AutoMapper } from 'nestjsx-automapper';

@Profile()
export class RoleProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleDto);
  }
}
