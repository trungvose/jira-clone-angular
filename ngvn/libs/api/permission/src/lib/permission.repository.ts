import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { Permission } from './permission.model';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(@InjectModel(Permission.modelName) private readonly permissionModel: ModelType<Permission>) {
    super(permissionModel);
  }
}
