import { Injectable } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { ProjectIssue } from './models';
import { ProjectIssueRepository } from './project-issue.repository';

@Injectable()
export class ProjectIssueService extends BaseService<ProjectIssue> {
  constructor(private readonly projectIssueRepository: ProjectIssueRepository) {
    super(projectIssueRepository);
  }
}
