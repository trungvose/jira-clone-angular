import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { MarkdownService } from '@ngvn/api/common-providers';
import {
  AuthUserDto,
  CreateIssueParamsDto,
  ProjectIssueDetailDto,
  ProjectIssueDto,
  UpdateIssueDetailDto,
  UpdateIssueParamsDto,
} from '@ngvn/api/dtos';
import { PermissionJob, permissionQueueName, ProjectJob, projectQueueName } from '@ngvn/background/common';
import { ProjectIssueStatus } from '@ngvn/shared/project';
import { Queue } from 'bull';
import { Types } from 'mongoose';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { ProjectIssue, ProjectLaneCondition } from './models';
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

    await this.projectQueue.add(ProjectJob.UpdateLanesWithIssue, {
      projectId,
      issueId: result.id,
      statuses: [ProjectIssueStatus.Backlog],
    });
    await this.permissionQueue.add(PermissionJob.CreateProjectIssuePermission, { issueId: result.id, projectId });
    return this.mapper.map(result.toJSON(), ProjectIssueDto, ProjectIssue);
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

  async bulkUpdateByLaneCondition(issues: Types.ObjectId[], laneCondition: ProjectLaneCondition): Promise<void> {
    await this.projectIssueRepository.bulkUpdateByLaneCondition(issues, laneCondition);
  }
}
