import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission } from './permission.model';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [MongooseModule.forFeature([Permission.featureConfig])],
  providers: [PermissionRepository],
})
export class ApiPermissionModule {
}
