import { Injectable } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { Role } from './role.model';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
