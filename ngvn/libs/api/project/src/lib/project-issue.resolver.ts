import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@ngvn/api/common';
import { ProjectIssueDetailDto } from '@ngvn/api/dtos';
import { LookupPermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { ProjectIssueService } from './project-issue.service';

@Resolver()
export class ProjectIssueResolver {
  constructor(private readonly projectIssueService: ProjectIssueService) {}

  @Query((returns) => ProjectIssueDetailDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Read, 'id'))
  async findIssueById(@Args('id') id: string): Promise<ProjectIssueDetailDto> {
    return await this.projectIssueService.findById(id);
  }
}
