import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@ngvn/api/common';
import { ProjectDto } from '@ngvn/api/dtos';
import { LookupPermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { ProjectService } from '../project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query((returns) => ProjectDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectManage, Privilege.Read, 'slug'))
  async findProjectBySlug(@Args('slug') slug: string): Promise<ProjectDto> {
    return await this.projectService.findBySlug(slug);
  }
}
