import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { MoveIssueParamsDto, ReorderIssueParamsDto } from '@ngvn/api/dtos';
import { ModelType } from '@ngvn/api/types';
import { Types } from 'mongoose';
import { Project } from './models';

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
      return await this.findAll()
        .or([{ users: Types.ObjectId(userId) }, { owner: Types.ObjectId(userId) }])
        .exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }

  async reorderIssue({ projectId, laneId, issues }: ReorderIssueParamsDto): Promise<Project> {
    try {
      return await this.updateByFilter(
        {
          _id: Types.ObjectId(projectId),
          lanes: { $elemMatch: { _id: Types.ObjectId(laneId) } },
        },
        {
          $set: {
            'lanes.$.issues': issues.map(Types.ObjectId),
          },
        },
      ).exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }

  async moveIssue({
    projectId,
    previousLaneId,
    previousIssues,
    targetLaneId,
    targetIssues,
  }: MoveIssueParamsDto): Promise<Project> {
    try {
      await this.updateBy(
        projectId,
        {
          $set: {
            'lanes.$[previous].issues': previousIssues.map(Types.ObjectId),
          },
        },
        {
          arrayFilters: [{ 'previous._id': Types.ObjectId(previousLaneId) }],
        },
        { autopopulate: false },
      ).exec();
      return await this.updateBy(
        projectId,
        {
          $set: {
            'lanes.$[target].issues': targetIssues.map(Types.ObjectId),
          },
        },
        {
          multi: true,
          arrayFilters: [{ 'target._id': Types.ObjectId(targetLaneId) }],
        },
      ).exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }
}
