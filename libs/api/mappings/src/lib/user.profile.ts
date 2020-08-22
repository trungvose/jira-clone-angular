import { AuthUserDto, PermissionDto, UserDto, UserInformationDto } from '@ngvn/api/dtos';
import { Permission, ProjectPermission } from '@ngvn/api/permission';
import { PermissionType } from '@ngvn/shared/permission';
import { User } from '@ngvn/shared/user';
import { AutoMapper, ignore, mapFrom, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(private mapper: AutoMapper) {
    super();
    mapper
      .createMap(User, AuthUserDto)
      .forMember((d) => d.permissions, ignore())
      .afterMap(this.userPermissionsAfterMap.bind(this));
    mapper.createMap(User, UserDto).forMember(
      (d) => d.fullName,
      mapFrom((s) => s.firstName + ' ' + s.lastName),
    );
    mapper
      .createMap(User, UserInformationDto, { includeBase: [User, UserDto] })
      .forMember((d) => d.permissions, ignore());
  }

  private userPermissionsAfterMap(source: User, destination: UserInformationDto | AuthUserDto): void {
    const sourcePermissions = source.permissions as Permission[];
    destination.permissions = sourcePermissions
      .filter((sp) => sp.type === PermissionType.System)
      .map((p) => this.mapper.map(p, PermissionDto, Permission));

    sourcePermissions
      .filter((p) => p.type === PermissionType.Team)
      .reduce(this.permissionReducer('team'), destination.permissions);
    sourcePermissions
      .filter((p) => p.type === PermissionType.Project)
      .reduce(this.permissionReducer('project'), destination.permissions);
    sourcePermissions
      .filter((p) => p.type === PermissionType.ProjectIssue)
      .reduce(this.permissionReducer('projectIssue'), destination.permissions);
  }

  private permissionReducer(field: 'team' | 'project' | 'projectIssue') {
    const dtoField = field + 's';
    const idField = field + 'Id';
    return <T extends Permission>(acc: PermissionDto[], cur: T) => {
      const dto = this.mapper.map(cur, PermissionDto, Permission, {
        afterMap: (_, destination) => (destination[dtoField] = []),
      });

      const found = acc.find((x) => x.name === cur.permissionName && x.score === cur.privilege);
      const result = [cur[idField].toString()];
      if (field === 'project') {
        const projectPermission = cur as ProjectPermission;
        projectPermission.projectSlug && result.push(projectPermission.projectSlug);
      }

      if (found) {
        found[dtoField].push(...result);
      } else {
        dto[dtoField] = [...result];
        acc.push(dto);
      }
      return acc;
    };
  }
}
