import { PermissionDto } from '@ngvn/api/dtos';
import { PermissionNames, PermissionType, Privilege } from '@ngvn/shared/permission';

export function hasPrivilege(
  permissionName: PermissionNames,
  privilege: Privilege,
  checkSystemType: boolean = false,
): (permission: PermissionDto) => boolean {
  function checkPermission(permission: PermissionDto) {
    return permission.name === permissionName && (permission.score & privilege) === privilege;
  }

  return (permission: PermissionDto) => {
    if (checkSystemType) {
      return checkPermission(permission) && permission.type === PermissionType.System;
    }
    return checkPermission(permission);
  };
}
