import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@ngvn/api/common';
import { MoveIssueParamsDto, ProjectDto, ProjectInformationDto, ReorderIssueParamsDto } from '@ngvn/api/dtos';
import { LookupPermissionGuard, PermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {
  }

  @Query(() => ProjectDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectManage, Privilege.Read, 'slug'))
  async findProjectBySlug(@Args('slug') slug: string): Promise<ProjectDto> {
    return await this.projectService.findBySlug(slug);
  }

  @Query(() => [ProjectInformationDto])
  @UseGuards(GqlAuthGuard, PermissionGuard(PermissionNames.ProjectManage, Privilege.Read))
  async findProjectsByUserId(@Args('userId') userId: string): Promise<ProjectInformationDto[]> {
    return await this.projectService.findByUserId(userId);
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectManage, Privilege.Update, 'projectId'))
  async reorderIssueInLane(@Args() reorderDto: ReorderIssueParamsDto): Promise<ProjectDto> {
    return await this.projectService.reorderIssue(reorderDto);
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectManage, Privilege.Update, 'projectId'))
  async moveIssueBetweenLanes(@Args() moveDto: MoveIssueParamsDto): Promise<ProjectDto> {
    return await this.projectService.moveIssue(moveDto);
  }
}
