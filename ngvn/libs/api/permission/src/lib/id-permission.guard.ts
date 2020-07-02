import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { memoize } from '@ngvn/api/common';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { getAuthUser } from './utils/get-auth-user.util';
import { hasPrivilege } from './utils/has-privilege.util';

export const IdPermissionGuard: (name: PermissionNames, privilege: Privilege, id: string) => CanActivate = memoize(
  createIdPermissionGuard,
);

function createIdPermissionGuard(name: PermissionNames, privilege: Privilege, id: string): Constructor<CanActivate> {
  const field = name.split('.')[0] + 's';

  class MixinIdPermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const currentUser = getAuthUser(context);
      const hasPermission = () => {
        if (currentUser.permissions == null || !currentUser.permissions.length) {
          return false;
        }

        return currentUser.permissions.some(
          (p) => hasPrivilege(name, privilege)(p) && p[field].some((oid) => oid.toString() === id),
        );
      };

      return currentUser && (currentUser.isSystemAdmin || hasPermission());
    }
  }

  return mixin(MixinIdPermissionGuard);
}
