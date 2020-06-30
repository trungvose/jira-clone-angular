import { PermissionDto } from '@ngvn/api/dtos';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';

export function hasPrivilege(
  permissionName: PermissionNames,
  privilege: Privilege,
): (permission: PermissionDto) => boolean {
  return (permission: PermissionDto) =>
    permission.name === permissionName && (permission.score & privilege) === privilege;
}
