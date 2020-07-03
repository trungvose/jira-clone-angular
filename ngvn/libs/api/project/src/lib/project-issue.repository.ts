import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { ProjectIssue } from './models';

@Injectable()
export class ProjectIssueRepository extends BaseRepository<ProjectIssue> {
  constructor(@InjectModel(ProjectIssue.modelName) private readonly projectIssueModel: ModelType<ProjectIssue>) {
    super(projectIssueModel);
  }
}
