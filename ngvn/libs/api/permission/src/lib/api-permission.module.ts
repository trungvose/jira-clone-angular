import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission } from './permission.model';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

@Module({
  imports: [MongooseModule.forFeature([Permission.featureConfig])],
  providers: [PermissionRepository, PermissionService],
  exports: [PermissionService],
})
export class ApiPermissionModule {}
