import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { PermissionNames, PermissionType, Privilege } from '@ngvn/shared/permission';
import { DocumentType, getDiscriminatorModelForClass } from '@typegoose/typegoose';
import { Permission } from './permission.model';
import { ProjectIssuePermission } from './project-issue-permission.model';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  private readonly ProjectIssueModel = getDiscriminatorModelForClass(
    this.permissionModel,
    ProjectIssuePermission,
    PermissionType.ProjectIssue,
  );
  // private readonly ProjectModel = getDiscriminatorModelForClass(
  //   this.permissionModel,
  //   ProjectPermission,
  //   PermissionType.Project,
  // );
  // private readonly TeamModel = getDiscriminatorModelForClass(this.permissionModel, TeamPermission,
  // PermissionType.Team);

  constructor(@InjectModel(Permission.modelName) private readonly permissionModel: ModelType<Permission>) {
    super(permissionModel);
  }

  async findByNameAndPrivilege<T extends Permission = Permission>(
    name: PermissionNames,
    privilege: Privilege,
  ): Promise<T> {
    return (await this.findOne({ autopopulate: false })
      .where('permissionName', name)
      .where('privilege', privilege)
      .exec()) as DocumentType<T>;
  }

  async createProjectIssuePermission(issueId: string): Promise<ProjectIssuePermission[]> {
    const ownerPermission = new this.ProjectIssueModel({
      permissionName: PermissionNames.ProjectIssueManage,
      privilege: 15,
      type: PermissionType.ProjectIssue,
      projectIssueId: PermissionRepository.toObjectId(issueId),
    });
    const userPermission = new this.ProjectIssueModel({
      permissionName: PermissionNames.ProjectIssueManage,
      privilege: 7,
      type: PermissionType.ProjectIssue,
      projectIssueId: PermissionRepository.toObjectId(issueId),
    });
    return await Promise.all([
      this.ProjectIssueModel.create(ownerPermission),
      this.ProjectIssueModel.create(userPermission),
    ]);
  }
}
