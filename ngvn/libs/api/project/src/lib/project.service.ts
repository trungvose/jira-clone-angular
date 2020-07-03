import { Injectable } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { Project } from './models';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(private readonly projectRepository: ProjectRepository) {
    super(projectRepository);
  }
}
