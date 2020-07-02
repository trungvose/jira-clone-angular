import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { DocumentType } from '@typegoose/typegoose';
import { Permission } from './permission.model';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(@InjectModel(Permission.modelName) private readonly permissionModel: ModelType<Permission>) {
    super(permissionModel);
  }

  async findByNameAndPrivilege<T extends Permission = Permission>(
    name: PermissionNames,
    privilege: Privilege,
  ): Promise<T> {
    return await this.findOne({ autopopulate: false })
      .where('permissionName')
      .equals(name)
      .where('privilege')
      .equals(privilege)
      .exec() as DocumentType<T>;
  }
}
