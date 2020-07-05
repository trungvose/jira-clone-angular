import { Injectable } from '@nestjs/common';
import { CacheService } from '@ngvn/api/caching';
import { BaseService } from '@ngvn/api/common';
import { ProjectDto, ProjectInformationDto } from '@ngvn/api/dtos';
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

  async findByUserId(userId: string): Promise<ProjectInformationDto[]> {
    const projects = await this.cacheService.get(`projects_user_${userId}`, () =>
      this.projectRepository.findByUser(userId),
    );
    return this.mapper.mapArray(projects, ProjectInformationDto, Project);
  }
}
