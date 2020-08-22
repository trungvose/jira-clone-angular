import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '@ngvn/api/common';
import {
  AuthUserDto,
  CreateIssueParamsDto,
  CreateUpdateTagParamsDto,
  ProjectIssueDetailDto,
  ProjectIssueDto,
  ProjectIssueTagDto,
  UpdateIssueParamsDto,
} from '@ngvn/api/dtos';
import { LookupPermissionGuard, PermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { ProjectIssueService } from './project-issue.service';

@Resolver()
export class ProjectIssueResolver {
  constructor(private readonly projectIssueService: ProjectIssueService) {
  }

  @Query((returns) => ProjectIssueDetailDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Read, 'id'))
  async findIssueById(@Args('id') id: string): Promise<ProjectIssueDetailDto> {
    return await this.projectIssueService.findById(id);
  }

  @Mutation(() => ProjectIssueDto)
  @UseGuards(GqlAuthGuard, PermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Create, true))
  async createIssue(
    @Args() createIssueDto: CreateIssueParamsDto,
    @CurrentUser() currentUser: AuthUserDto,
  ): Promise<ProjectIssueDto> {
    return await this.projectIssueService.createIssue(createIssueDto, currentUser);
  }

  @Mutation(() => ProjectIssueDetailDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Update, 'issue.id'))
  async updateIssue(@Args() updateIssueDto: UpdateIssueParamsDto): Promise<ProjectIssueDetailDto> {
    return await this.projectIssueService.updateIssue(updateIssueDto);
  }

  @Mutation(() => ProjectIssueDetailDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Update, 'id'))
  async updateMarkdown(@Args('id') id: string, @Args('markdown') markdown: string): Promise<ProjectIssueDetailDto> {
    return await this.projectIssueService.updateMarkdown(id, markdown);
  }

  @Mutation(() => ProjectIssueTagDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Update, 'id'))
  async addTag(
    @Args('id') id: string,
    @Args('newTag') tagParams: CreateUpdateTagParamsDto,
    @CurrentUser() currentUser: AuthUserDto,
  ): Promise<ProjectIssueTagDto> {
    return await this.projectIssueService.addTag(id, currentUser.id, tagParams);
  }

  @Mutation(() => ProjectIssueTagDto)
  @UseGuards(GqlAuthGuard, LookupPermissionGuard(PermissionNames.ProjectIssueManage, Privilege.Update, 'id'))
  async removeTag(
    @Args('id') id: string,
    @Args('tagId') tagId: string,
    @CurrentUser() currentUser: AuthUserDto,
  ): Promise<ProjectIssueTagDto> {
    return await this.projectIssueService.removeTag(id, currentUser.id, tagId);
  }
}
