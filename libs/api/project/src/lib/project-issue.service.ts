import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { MarkdownService } from '@ngvn/api/common-providers';
import {
  AuthUserDto,
  CreateIssueParamsDto,
  CreateUpdateTagParamsDto,
  ProjectIssueDetailDto,
  ProjectIssueDto,
  ProjectIssueTagDto,
  UpdateIssueDetailDto,
  UpdateIssueParamsDto,
} from '@ngvn/api/dtos';
import {
  PermissionJob,
  permissionQueueName,
  ProjectIssueJob,
  projectIssueQueueName,
  ProjectJob,
  projectQueueName,
} from '@ngvn/background/common';
import { ProjectIssueStatus } from '@ngvn/shared/project';
import { Queue } from 'bull';
import { Types } from 'mongoose';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { ProjectIssue, ProjectIssueTag, ProjectLaneCondition } from './models';
import { ProjectIssueRepository } from './project-issue.repository';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectIssueService extends BaseService<ProjectIssue> {
  constructor(
    private readonly projectIssueRepository: ProjectIssueRepository,
    @InjectMapper() private readonly mapper: AutoMapper,
    private readonly projectService: ProjectService,
    private readonly markdownService: MarkdownService,
    @InjectQueue(projectQueueName) private readonly projectQueue: Queue,
    @InjectQueue(permissionQueueName) private readonly permissionQueue: Queue,
    @InjectQueue(projectIssueQueueName) private readonly projectIssueQueue: Queue,
  ) {
    super(projectIssueRepository);
  }

  async findById(id: string): Promise<ProjectIssueDetailDto> {
    const issue = await this.projectIssueRepository.findById(id).exec();
    if (issue == null) {
      throw new NotFoundException(id, 'No issue found with id');
    }
    return this.mapper.map(issue, ProjectIssueDetailDto, ProjectIssue);
  }

  async createIssue(createIssueDto: CreateIssueParamsDto, currentUser: AuthUserDto): Promise<ProjectIssueDto> {
    const { projectId, ...dto } = createIssueDto;
    const isProjectExist = await this.projectService.isProjectExistById(projectId);
    if (!isProjectExist) {
      throw new NotFoundException(projectId, 'Project not found');
    }

    const newIssue = this.createModel(this.mapper.map(dto, ProjectIssue, CreateIssueParamsDto));

    newIssue.reporter = Types.ObjectId(currentUser.id);
    newIssue.participants.push(newIssue.reporter);
    newIssue.ordinalPosition = (await this.projectService.findIssuesCountById(projectId)) + 1;
    const result = await this.create(newIssue);

    await Promise.all([
      this.projectQueue.add(ProjectJob.UpdateLanesWithIssue, {
        projectId,
        issueId: result.id,
        statuses: [ProjectIssueStatus.Backlog],
      }),
      this.permissionQueue.add(PermissionJob.CreateProjectIssuePermission, { issueId: result.id, projectId }),
    ]);
    return this.mapper.map(result, ProjectIssueDto, ProjectIssue);
  }

  async updateIssue({ projectId, issue }: UpdateIssueParamsDto): Promise<ProjectIssueDetailDto> {
    const projectIssue = await this.projectIssueRepository.findById(issue.id).exec();

    if (projectIssue == null) {
      throw new NotFoundException(issue.id, 'Project Issue not found');
    }

    const mapped = this.mapper.map(issue, ProjectIssue, UpdateIssueDetailDto);
    const isStatusChanged = projectIssue.status !== mapped.status;
    const result = await this.projectIssueRepository.update(Object.assign(projectIssue, mapped)).exec();

    if (isStatusChanged) {
      await this.projectQueue.add(ProjectJob.UpdateLanesWithIssue, {
        projectId,
        issueId: result.id,
        statuses: [result.status, projectIssue.status],
      });
    }

    return this.mapper.map(result, ProjectIssueDetailDto, ProjectIssue);
  }

  async updateMarkdown(id: string, markdown: string): Promise<ProjectIssueDetailDto> {
    const exist = await this.projectIssueRepository.exists({ id });
    if (!exist) {
      throw new NotFoundException(id, 'Project issue not found');
    }

    const result = await this.updateBy(id, { $set: { outputHtml: this.markdownService.generateHtml(markdown) } });
    return this.mapper.map(result, ProjectIssueDetailDto, ProjectIssue);
  }

  async addTag(
    issueId: string,
    actorId: string,
    createTagParams: CreateUpdateTagParamsDto,
  ): Promise<ProjectIssueTagDto> {
    const exist = await this.projectIssueRepository.exists({ id: issueId });
    if (!exist) {
      throw new NotFoundException(issueId, 'Project issue not found');
    }

    const newTag = this.mapper.map(createTagParams, ProjectIssueTag, CreateUpdateTagParamsDto);
    const result = await this.updateBy(issueId, { $push: { tags: newTag } });
    const lastAddedTag = result.tags.pop();
    await this.projectIssueQueue.add(ProjectIssueJob.AddTimelineTag, {
      id: issueId,
      actorId,
      tag: lastAddedTag,
      action: 'add',
    });
    return this.mapper.map(lastAddedTag, ProjectIssueTagDto, ProjectIssueTag);
  }

  async removeTag(issueId: string, actorId: string, tagId: string): Promise<ProjectIssueTagDto> {
    const exist = await this.projectIssueRepository.findById(issueId);
    if (!exist) {
      throw new NotFoundException(issueId, 'Project issue not found');
    }

    const tag = exist.tags.find(t => t.id == tagId);
    await this.updateBy(issueId, { $pull: { tags: { $elemMatch: { _id: Types.ObjectId(tagId) } } as any } });
    await this.projectIssueQueue.add(ProjectIssueJob.AddTimelineTag, {
      id: issueId,
      actorId,
      tag,
      action: 'remove',
    });
    return this.mapper.map(tag, ProjectIssueTagDto, ProjectIssueTag);
  }

  async bulkUpdateByLaneCondition(issues: Types.ObjectId[], laneCondition: ProjectLaneCondition): Promise<void> {
    await this.projectIssueRepository.bulkUpdateByLaneCondition(issues, laneCondition);
  }
}
