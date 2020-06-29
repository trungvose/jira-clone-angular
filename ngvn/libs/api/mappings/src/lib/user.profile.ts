import { AuthUserDto, RoleDto, UserDto, UserInformationDto } from '@ngvn/api/dtos';
import { Permission } from '@ngvn/api/permission';
import { Role } from '@ngvn/api/role';
import { User } from '@ngvn/api/user';
import { Profile, ProfileBase, AutoMapper, mapWith, mapFrom } from 'nestjsx-automapper';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserDto).reverseMap();
    mapper.createMap(User, AuthUserDto).forMember(
      (d) => d.role,
      mapWith(RoleDto, (s) => s.role),
    );
    mapper
      .createMap(User, UserInformationDto)
      .forMember(
        (d) => d.fullName,
        mapFrom((s) => s.firstName + ' ' + s.lastName),
      )
      .forMember((d) => d.permissions, mapFrom(this.permissionsMap.bind(this)));
  }

  private permissionsMap(source: User): { [key: string]: number } {
    return (source.role as Role).permissions.reduce(this.permissionReducer, {});
  }

  private permissionReducer(entity: { [key: string]: number }, permission: Permission): typeof entity {
    entity[permission.group] = permission.score;
    return entity;
  }
}
