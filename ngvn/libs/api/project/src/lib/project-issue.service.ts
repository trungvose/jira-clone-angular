import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { AuthUserDto, CreateIssueParamsDto, ProjectIssueDetailDto } from '@ngvn/api/dtos';
import { ProjectIssueStatus } from '@ngvn/shared/project';
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

  async createIssue(createIssueDto: CreateIssueParamsDto, currentUser: AuthUserDto) {
    const { projectId, ...dto } = createIssueDto;
    const isProjectExist = await this.projectService.isProjectExistById(projectId);
    if (!isProjectExist) {
      throw new NotFoundException(projectId, 'Project not found');
    }

    const newIssue = this.createModel(this.mapper.map(dto, ProjectIssue, CreateIssueParamsDto));

    newIssue.reporter = this.toObjectId(currentUser.id);
    newIssue.participants.push(newIssue.reporter);
    // TODO(Chau): Generate HTML from bodyMarkdown
    newIssue.outputHtml = '';
    newIssue.ordinalPosition = ((await this.projectService.findIssuesCountById(projectId)) + 1).toString();
    const result = await this.create(newIssue);
    // TODO(team): Decide on what to do after adding a new issue
  }

  async bulkUpdateByLaneCondition(issues: Types.ObjectId[], laneCondition: ProjectLaneCondition): Promise<void> {
    await this.projectIssueRepository.bulkUpdateByLaneCondition(issues, laneCondition);
  }

  async updateStatus(id: string, status: ProjectIssueStatus): Promise<ProjectIssueDetailDto> {
    const issue = await this.projectIssueRepository.updateStatus(id, status);
    return this.mapper.map(issue, ProjectIssueDetailDto, ProjectIssue);
  }
}
