import { Injectable } from '@nestjs/common';
import { CacheService } from '@ngvn/api/caching';
import { BaseService } from '@ngvn/api/common';
import { ProjectDto } from '@ngvn/api/dtos';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { Project } from './models';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {
    super(projectRepository);
  }

  async findBySlug(slug: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findBySlug(slug);
    return this.mapper.map(project, ProjectDto, Project);
  }
}
