import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@ngvn/api/common';
import { ProjectDto } from '@ngvn/api/dtos';
import { PermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { ProjectService } from '../project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query((returns) => ProjectDto)
  @UseGuards(GqlAuthGuard, PermissionGuard(PermissionNames.ProjectManage, Privilege.Read))
  async findBySlug(@Args('slug') slug: string): Promise<ProjectDto> {
    return await this.projectService.findBySlug(slug);
  }
}
