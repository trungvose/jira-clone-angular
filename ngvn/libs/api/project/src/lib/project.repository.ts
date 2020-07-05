import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
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
      return await this.findAll().where('users').equals(userId).exec();
    } catch (e) {
      ProjectRepository.throwMongoError(e);
    }
  }
}
