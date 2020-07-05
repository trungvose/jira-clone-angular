import { Injectable } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { ProjectIssueDetailDto } from '@ngvn/api/dtos';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { ProjectIssue } from './models';
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
    return this.mapper.map(issue, ProjectIssueDetailDto, ProjectIssue);
  }
}
