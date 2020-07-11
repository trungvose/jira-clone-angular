import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { GqlExecutionContext } from '@nestjs/graphql';
import { memoize } from '@ngvn/api/common';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { getAuthUser } from './utils/get-auth-user.util';
import { hasPrivilege } from './utils/has-privilege.util';

export const LookupPermissionGuard: (
  name: PermissionNames,
  privilege: Privilege,
  lookupField: string,
) => CanActivate = memoize(createLookupPermissionGuard);

function createLookupPermissionGuard(
  name: PermissionNames,
  privilege: Privilege,
  lookupField: string,
): Constructor<CanActivate> {
  const field = name.split('.')[0] + 's';

  class MixinIdPermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const lookup = GqlExecutionContext.create(context).getArgs()[lookupField];

      if (lookup == null) {
        return true;
      }

      const currentUser = getAuthUser(context);

      const hasPermission = () => {
        if (currentUser.permissions == null || !currentUser.permissions.length) {
          return false;
        }

        return currentUser.permissions.some(
          (p) => hasPrivilege(name, privilege)(p) && p[field].some((val) => val.toString() === lookup),
        );
      };

      return currentUser && (currentUser.isSystemAdmin || hasPermission());
    }
  }

  return mixin(MixinIdPermissionGuard);
}
