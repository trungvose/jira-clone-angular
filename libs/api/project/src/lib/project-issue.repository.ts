import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { ProjectIssueStatus } from '@ngvn/shared/project';
import { Types } from 'mongoose';
import { ProjectIssue, ProjectLaneCondition } from './models';

@Injectable()
export class ProjectIssueRepository extends BaseRepository<ProjectIssue> {
  constructor(@InjectModel(ProjectIssue.modelName) private readonly projectIssueModel: ModelType<ProjectIssue>) {
    super(projectIssueModel);
  }

  async createIssue(issue: ProjectIssue): Promise<ProjectIssue> {
    return await this.create(issue);
  }

  // TODO: update by all Conditions. Right now, this method only updates by status and only Operand.Eq
  async bulkUpdateByLaneCondition(issues: Types.ObjectId[], laneCondition: ProjectLaneCondition): Promise<void> {
    try {
      await this.model
        .updateMany(
          {},
          {
            $set: { status: laneCondition.value as ProjectIssueStatus },
          },
          { multi: true, new: true },
        )
        .setOptions(this.getQueryOptions())
        .in('_id', issues)
        .ne('status', laneCondition.value)
        .exec();
    } catch (e) {
      // TODO(chau): Handle error
    }
  }
}
