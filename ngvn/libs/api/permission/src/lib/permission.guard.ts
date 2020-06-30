import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { memoize } from '@ngvn/api/common';
import { AuthUserDto } from '@ngvn/api/dtos';
import { PermissionNames, Privilege } from '@ngvn/api/permission';
import { Request } from 'express';

export const PermissionGuard: (name: PermissionNames, privilege: Privilege) => CanActivate = memoize(
  createPermissionGuard,
);

function createPermissionGuard(name: PermissionNames, privilege: Privilege): Constructor<CanActivate> {
  class MixinPermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const currentUser = (context.switchToHttp().getRequest<Request>() as any).user as AuthUserDto;
      const hasPermission = () => {
        if (currentUser.role?.permissions == null) {
          return false;
        }

        return currentUser.role.permissions.some((p) => p.name === name && (p.score & privilege) === privilege);
      };

      return currentUser && (currentUser.role?.isGlobal || hasPermission());
    }
  }

  return mixin(MixinPermissionGuard);
}
