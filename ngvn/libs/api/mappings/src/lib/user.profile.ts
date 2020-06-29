import { AuthUserDto, RoleDto, UserDto } from '@ngvn/api/dtos';
import { User } from '@ngvn/api/user';
import { Profile, ProfileBase, AutoMapper, mapWith } from 'nestjsx-automapper';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserDto).reverseMap();
    mapper.createMap(User, AuthUserDto).forMember(
      (d) => d.role,
      mapWith(RoleDto, (s) => s.role),
    );
  }
}
