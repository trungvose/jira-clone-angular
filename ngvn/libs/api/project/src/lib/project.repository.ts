import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ReorderIssueParamsDto } from '@ngvn/api/dtos';
import { ModelType } from '@ngvn/api/types';
import { Project, ProjectLane } from './models';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(@InjectModel(Project.modelName) private readonly projectModel: ModelType<Project>) {
    super(projectModel);
  }

  async findBySlug(slug: string): Promise<Project> {
    try {
      return await this.findOne().where('slug').equals(slug).exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }

  async findByUser(userId: string): Promise<Project[]> {
    try {
      return await this.findAll().where('users').equals(userId).exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }

  async reorderIssue({
    projectId,
    laneId,
    issueId,
    previousIndex,
    targetIndex,
  }: ReorderIssueParamsDto): Promise<Project> {
    try {
      await this.updateByFilter(
        {
          _id: ProjectRepository.toObjectId(projectId),
          lanes: { $elemMatch: { _id: ProjectRepository.toObjectId(laneId) } },
        },
        {
          $unset: {
            [`lanes.$.issues.${previousIndex}`]: '',
          },
        },
        {},
        { autopopulate: false },
      ).exec();

      return await this.updateByFilter(
        {
          _id: ProjectRepository.toObjectId(projectId),
          lanes: { $elemMatch: { _id: ProjectRepository.toObjectId(laneId) } },
        },
        {
          $push: {
            'lanes.$.issues': { $each: [ProjectRepository.toObjectId(issueId)], $position: targetIndex },
          },
        },
      ).exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }
}
