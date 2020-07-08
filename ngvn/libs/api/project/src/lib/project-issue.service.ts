import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { ProjectIssueDetailDto } from '@ngvn/api/dtos';
import { ProjectIssueStatus } from '@ngvn/shared/project';
import { Types } from 'mongoose';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { ProjectIssue, ProjectLaneCondition } from './models';
import { ProjectIssueRepository } from './project-issue.repository';

@Injectable()
export class ProjectIssueService extends BaseService<ProjectIssue> {
  constructor(
    private readonly projectIssueRepository: ProjectIssueRepository,
    @InjectMapper() private readonly mapper: AutoMapper,
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

  async bulkUpdateByLaneCondition(issues: Types.ObjectId[], laneCondition: ProjectLaneCondition): Promise<void> {
    await this.projectIssueRepository.bulkUpdateByLaneCondition(issues, laneCondition);
  }

  async updateStatus(id: string, status: ProjectIssueStatus): Promise<ProjectIssueDetailDto> {
    const issue = await this.projectIssueRepository.updateStatus(id, status);
    return this.mapper.map(issue, ProjectIssueDetailDto, ProjectIssue);
  }
}
