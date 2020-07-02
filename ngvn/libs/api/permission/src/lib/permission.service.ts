import { Injectable } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { Permission } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(private readonly permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }

  async findByNameAndPrivilege(name: PermissionNames, privilege: Privilege): Promise<Permission> {
    return await this.permissionRepository.findByNameAndPrivilege(name, privilege);
  }
}
