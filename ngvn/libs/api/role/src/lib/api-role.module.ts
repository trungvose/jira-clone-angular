import { Module } from '@nestjs/common';
import { RoleService } from './role.service';

@Module({
  controllers: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class ApiRoleModule {}
