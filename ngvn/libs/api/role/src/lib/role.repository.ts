import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { Role } from './role.model';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(@InjectModel(Role.modelName) private readonly roleModel: ModelType<Role>) {
    super(roleModel);
  }
}
